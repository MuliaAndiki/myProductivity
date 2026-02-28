package app

import (
	"myproductivity-backend/src/config"
	"myproductivity-backend/src/database"
	"myproductivity-backend/src/routes"
	"myproductivity-backend/src/server"

	"github.com/gin-gonic/gin"
)

func StartApp() {
	app := gin.Default()

	
	config.LoadEnv()

	
	database.ConnectDb()


	routes.AuthRoutes(app)
	routes.InitialRoutes(app)


	app.Run(server.Run)
}