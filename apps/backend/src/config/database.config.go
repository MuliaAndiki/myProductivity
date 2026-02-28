package config

import (
	"os"

	"github.com/joho/godotenv"
)

var DB_DRIVER string
var DB_HOST string
var DB_PORT string
var DB_NAME string
var DB_USER string
var DB_PASSWORD string
var DATABASE_URL string

func LoadEnv() {
	_ = godotenv.Load()

	DB_DRIVER = os.Getenv("DB_DRIVER")
	DB_HOST = os.Getenv("DB_HOST")
	DB_PORT = os.Getenv("DB_PORT")
	DB_NAME = os.Getenv("DB_NAME")
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
	DATABASE_URL = os.Getenv("DATABASE_URL")
}
