package routes

import (
	"myproductivity-backend/src/controller"

	"github.com/gin-gonic/gin"
)

func AuthRoutes (app *gin.Engine){
	route := app.Group("/api/auth")

	route.POST("/register", func(c * gin.Context) {controller.Register(c)})

	
}