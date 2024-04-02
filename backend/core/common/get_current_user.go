package common

// there's probably a better place for this file but i suck at system design so whatever
// deal with it :)
// nah but fr i need help where do i put this??? 😭😭😭😭

import (
	"backend/core/db/models"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func GetCurrentUser(ctx *gin.Context, userId string) *models.User {
	db, _ := ctx.MustGet("db").(*gorm.DB)

	var foundUser models.User
	userQueryResult := db.
		// Preload the congregation to ensure it's included in the user payload
		Preload("Congregation").
		First(&foundUser, "id = ?", userId)

	if userQueryResult.Error != nil {
		return nil
	}

	return &foundUser
}
