package middleware

import (
	"myproductivity-backend/src/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware() gin.HandlerFunc{
	return  func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == ""{
			c.JSON(http.StatusUnauthorized,gin.H{
				"message": "token required",
			})
			c.Abort()
			return 
		}
		tokenStr := strings.TrimPrefix(authHeader,"Bearer ")
		claims, err := utils.ParseToken(tokenStr)
		if err != nil {
			c.JSON(http.StatusUnauthorized,gin.H{
				"message" : "invalid or expired token",
			})
			c.Abort()
			return 
		}
		c.Set("user",claims)
		c.Next()
	}
}