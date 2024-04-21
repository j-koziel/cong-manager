package repositories

import (
	"backend/core/db/models"
	"backend/core/services/security"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCurrentUser(ctx *gin.Context) *models.User {

	db, _ := ctx.MustGet("db").(*gorm.DB)

	tokenPayload, _ := ctx.MustGet("jwtPayload").(*security.SessionTokenPayload)
	var foundUser models.User
	userQueryResult := db.
		// Preload the congregation to ensure it's included in the user payload
		Preload("Congregation").
		First(&foundUser, "id = ?", tokenPayload.UserID)

	if userQueryResult.Error != nil {
		return nil
	}

	return &foundUser
}
