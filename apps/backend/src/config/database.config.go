package config

import (
	"os"
)

var DB_DRIVER string
var DB_HOST string
var DB_PORT string
var DB_NAME string
var DB_USER string
var DB_PASSWORD string

func LoadEnv() {
	DB_DRIVER = os.Getenv("DB_DRIVER")
	DB_HOST = os.Getenv("DB_HOST")
	DB_PORT = os.Getenv("DB_PORT")
	DB_NAME = os.Getenv("DB_NAME")
	DB_USER = os.Getenv("DB_USER")
	DB_PASSWORD = os.Getenv("DB_PASSWORD")
}