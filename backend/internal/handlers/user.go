package handlers

import (
	"backend/internal/common"
	"backend/internal/handlers/dtos"
	"backend/internal/models"
	"backend/internal/services"
	"backend/internal/services/security"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

func CreateUser(ctx *gin.Context) {
	/**
	 * Create a new user in the DB
	 */

	var dto dtos.CreateUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)
	user, err := services.CreateUserInDB(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	result := db.Create(&user)
	if result.Error != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserAlreadyExists,
		})
		return
	}

	ctx.JSON(http.StatusCreated, gin.H{"user": user})
}

func LoginUser(ctx *gin.Context) {
	/**
	 * Compare the password hash and set a USER-level JWT.
	 */

	var dto dtos.LoginUserDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db := ctx.MustGet("db").(*gorm.DB)

	var foundUser models.User
	result := db.First(&foundUser, "email = ?", dto.Email)
	if result.Error != nil {
		ctx.JSON(http.StatusNotFound, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserNotFound,
		})
		return
	}
	err = bcrypt.CompareHashAndPassword([]byte(foundUser.PasswordHash), []byte(dto.Password))
	if err != nil {
		ctx.JSON(http.StatusNotAcceptable, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.UserPasswordInvalid,
		})
		return
	}

	sessionToken, err := security.GenerateJWT(strconv.FormatUint(uint64(foundUser.ID), 10))
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.Unknown,
		})
		return
	}

	cookie := http.Cookie{
		Name:     "sessionToken",
		Value:    sessionToken,
		Path:     "/",
		Domain:   "",
		HttpOnly: true,
	}

	if common.GetEnvSecrets().Environment != "local" {
		cookie.Secure = true
		cookie.SameSite = http.SameSiteNoneMode
	}

	http.SetCookie(ctx.Writer, &cookie)

	ctx.JSON(http.StatusAccepted, gin.H{
		"sessionToken": sessionToken,
	})
}

func VerifyToken(ctx *gin.Context) {
	/**
	 * Verify that a user's token matches it's assigned token
	 */

	var dto services.JoinTokenMatchDTO
	err := ctx.BindJSON(&dto)
	if err != nil {
		ctx.JSON(http.StatusBadRequest, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	db, _ := ctx.MustGet("db").(*gorm.DB)

	err = services.VerifyToken(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	err = services.BindUserToCongregation(dto, db)
	if err != nil {
		ctx.JSON(http.StatusInternalServerError, gin.H{
			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
		})
		return
	}

	ctx.JSON(http.StatusAccepted, gin.H{"message": "Token matches"})
}

/**
 * Given an ADMIN user and congregation (which you need to verify), update the
 * congregation id foreign key of the admin to the required
 */
// func BindAdminToCongregation(ctx *gin.Context) {
// 	var dto dtos.BindAdminToCongregationDTO
// 	err := ctx.BindJSON(&dto)
// 	if err != nil {
// 		ctx.JSON(http.StatusBadRequest, gin.H{
// 			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
// 		})
// 		return
// 	}

// 	/**
// 	 * TODO (Jude): After you bind the request body to our request DTO, we need to
// 	 * check that the user ID (Admin) matches the session token payload and is in fact an admin.
// 	 *
// 	 * Use: sessionTokenPayload := ctx.MustGet("sessionToken").(*security.SessionTokenPayload)
// 	 * to retrieve the current user ID (sessionTokenPayload.UserID) it will be saved in the session.
// 	 */

// 	db, _ := ctx.MustGet("db").(*gorm.DB)

// 	var adminUser models.User
// 	result := db.First(&adminUser, "id = ?", dto.AdminID)
// 	if result.Error != nil {
// 		fmt.Println("[BindAdminToCongregation] ")
// 		ctx.JSON(http.StatusNotFound, gin.H{
// 			common.UserErrorInstance.UserErrKey: common.UserErrorInstance.BadRequestOrData,
// 		})
// 		return
// 	}

// 	// Update the adminUser congregation ID property to the congregation ID
// }
