package main

import (
	"fluxo/core/config"
	"fluxo/core/routes"
	"log"
	"os"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/helmet"
	"github.com/joho/godotenv"
)

func main() {
    err := godotenv.Load()
    if err != nil {
        log.Println(" No .env file found")
    }
    app := fiber.New()

   
    app.Use(helmet.New())
    
    config.ConnectDB()

 
    api := app.Group("/api")
    routes.InitialRoutes(api)
    
    app.Get("/health", func(c *fiber.Ctx) error {
        return c.JSON(fiber.Map{"status": "ok"})
    })

    port := os.Getenv("PORT")
    if port == "" {
        port = "5001"
    }
    log.Printf(" Server starting on port %s\n", port)
    log.Fatal(app.Listen(":" + port))
}