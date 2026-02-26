package routes

import (
	"myproductivity-backend/src/controller"

	"github.com/gin-gonic/gin"
)

func InitialRoutes(app *gin.Engine){
	 route := app

    route.GET("/", func(c *gin.Context) {controller.Healt(c)})
}