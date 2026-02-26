package controller

import "github.com/gin-gonic/gin"

func Healt(c *gin.Context){
        c.JSON(200, gin.H{
            "message": "Hello from Gin ",
        })
    
}