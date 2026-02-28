package controller

import (
	"myproductivity-backend/src/database"
	"myproductivity-backend/src/dto"
	"myproductivity-backend/src/models"

	"github.com/gin-gonic/gin"
	"golang.org/x/crypto/bcrypt"
)

func Login(c *gin.Context){
	var req dto.LoginRequest

	if err := c.ShouldBindBodyWithJSON(&req); err != nil{
		c.JSON(400,gin.H{
			"message":"request body not valid",
			"error" : err.Error(),
		})
		return
	}
	// no fix
}

func Register(c *gin.Context){
	var req dto.RegisterRequest
	
	if err := c.ShouldBindBodyWithJSON(&req); err != nil {
		c.JSON(400,gin.H{
			"message" : "req body no valid",
			"error": err.Error(),
		})
		return
	}
	var user models.User
	err := database.DB.Where("email = ?",req.Email).First(&user).Error

	if err == nil {
		c.JSON(409, gin.H{
			"message": "email already registered",
		})
		return
	}

	if err != nil && err.Error() != "record not found" {
		c.JSON(500, gin.H{"message": "database error"})
		return
	}

	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(req.Password), bcrypt.DefaultCost)
	if err != nil {
		c.JSON(500, gin.H{
			"message" : "failed to hash password",
		})
		return
	}


	newUser := models.User{
		Email: req.Email,
		FirstName: req.First_Name,
		LastName: req.Last_Name,
		Phone: req.Phone,
		Password: string(hashedPassword),
	}

	if newUser.Role == "" {
    newUser.Role = "user" 
}

	if err := database.DB.Create(&newUser).Error; err != nil{
		c.JSON(500,gin.H{
			"message" : "invalid create user",
		})
	}
	c.JSON(201,gin.H{
		"message" : "succesfily create uesr",
		"data": newUser,
	})
}