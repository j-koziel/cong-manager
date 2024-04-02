package congregation

import (
	"backend/core/common"
	"backend/core/db"
	"backend/core/db/models"
	"backend/core/services/security"
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func CreateCongregation(ctx *gin.Context) {
	/**
	 * Create a new congregation in the DB
	 */

	var dto models.Congregation
	err := common.BindAndValidate(ctx, &dto)
	if err != nil {
		fmt.Println("[CreateCongregation] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	ormDb, _ := ctx.MustGet("db").(*gorm.DB)

	// Generate a signature and check if it exists
	dto.GenerateSignature()
	isUnique, err := HasUniqueSignature(dto, ormDb)
	if err != nil {
		fmt.Println("[CreateCongregation] (signature check) Error creating congregation in database.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.FailedToCreateCongregation,
		})
		return
	}

	if !isUnique {
		fmt.Println("[CreateCongregation] Congregation is not unique.")
		ctx.JSON(http.StatusConflict, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationAlreadyExists,
		})
		return
	}

	err = CreateCongregationInDB(&dto, ormDb)
	if err != nil {
		fmt.Println("[CreateCongregation] Error creating congregation in database.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.FailedToCreateCongregation,
		})
		return
	}

	// The DTO will be updated in-place, so the ID property will also be updated
	ctx.JSON(http.StatusCreated, gin.H{"congregation": dto})
}

func DeleteCongregation(ctx *gin.Context) {
	var dto DeleteCongregationDTO
	err := common.BindAndValidate(ctx, &dto)
	if err != nil {
		fmt.Println("[DeleteCongregation] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	dbInst := db.Delete(&models.Congregation{}, dto.CongregationId)
	if dbInst.Error != nil {
		fmt.Println("[DeleteCongregation] couldn't delete congregation.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.CongregationNotFound,
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{})
}

func SendCongregationVerificationCode(ctx *gin.Context) {
	var dto SendCongregationVerificationCodeDTO
	err := common.BindAndValidate(ctx, &dto)
	if err != nil {
		fmt.Println("[SendCongregationVerificationCode] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)

	// Needs a signature
	dto.Congregation.GenerateSignature()

	verificationCode, userErr := CreateVerificationCode(dto, db)
	if userErr != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: userErr.Error(),
		})
		return
	}
	// TODO (Jude): need to connect to 3rd party OTP services
	SendVerificationCode(verificationCode)

	// Expire verification code
	err = ScheduleVerificationCodeRemoval(verificationCode, db)
	if err != nil {
		fmt.Println("[SendCongregationVerificationCode] Couldn't schedule verification code removal.")
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{})
}

func VerifyCongregationPhone(ctx *gin.Context) {
	var dto VerifyCongregationPhoneDTO
	err := common.BindAndValidate(ctx, &dto)
	if err != nil {
		fmt.Println("[VerifyCongregationPhone] incorrect payload.")
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}
	dto.Congregation.GenerateSignature()

	ormDb, _ := ctx.MustGet("db").(*gorm.DB)
	dbOps := &db.OrmDatabaseOps{
		DB: ormDb,
	}

	userErr := CheckVerificationCode(dto, dbOps, ctx)
	if userErr != nil {
		// CheckVerificationCode will handle the ctx response
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: userErr.Error(),
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{})
}

// Returns all the information board items for the congregation of the current user
func GetCongregationInformationBoard(ctx *gin.Context) {
	db, _ := ctx.MustGet("db").(*gorm.DB)

	// I wanted to put this line inside "GetCurrentUser" but had a weird ciruclar import issue
	tokenPayload, _ := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)

	// Get "Current" User
	// *requires a user id*
	// 👍
	foundUser := common.GetCurrentUser(ctx, tokenPayload.UserID)

	var foundCong models.Congregation
	queryResult := db.First(&foundCong, "id = ?", foundUser.CongregationID)

	if queryResult.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	ctx.JSON(http.StatusOK, gin.H{"informationBoard": foundCong.InformationBoard})
}

func AddInformationBoardItem(ctx *gin.Context) {
	var dto models.InformationBoardItem

	err := common.BindAndValidate(ctx, dto)

	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	tokenPayload, _ := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)
	currentUser := common.GetCurrentUser(ctx, tokenPayload.UserID)

	// If the current user is not an admin they should not be able to update the information board
	if currentUser.Type != "ADMIN" {
		ctx.JSON(http.StatusForbidden, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.AuthInvalid,
		})
	}

	// Find the congregation and update the information board with the new information board item
	db, _ := ctx.MustGet("db").(*gorm.DB)
	var congregation models.Congregation
	db.First(&congregation, "id = ", currentUser.CongregationID)

	congregation.InformationBoard = append(congregation.InformationBoard, dto)

	db.Save(&congregation)

	ctx.JSON(http.StatusOK, gin.H{
		"message": "information board has been updated successfully",
	})
}
