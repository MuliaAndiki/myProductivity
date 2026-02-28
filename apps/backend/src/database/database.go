package database

import (
	"fmt"
	"log"
	"myproductivity-backend/src/config"

	"gorm.io/driver/mysql"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDb() {
	var errConnection error

	switch config.DB_DRIVER {
	case "mysql":
		dsnMysql := fmt.Sprintf(
			"%s:%s@tcp(%s:%s)/%s?charset=utf8mb4&parseTime=True&loc=Local",
			config.DB_USER,
			config.DB_PASSWORD,
			config.DB_HOST,
			config.DB_PORT,
			config.DB_NAME,
		)

		DB, errConnection = gorm.Open(mysql.Open(dsnMysql), &gorm.Config{})
	case "postgres":
		dsnPostgres := fmt.Sprintf(
			"host=%s user=%s password=%s dbname=%s port=%s sslmode=disable TimeZone=Asia/Jakarta",
			config.DB_HOST,
			config.DB_USER,
			config.DB_PASSWORD,
			config.DB_NAME,
			config.DB_PORT,
		)

		DB, errConnection = gorm.Open(postgres.Open(dsnPostgres), &gorm.Config{})
	default:
		panic("DB_DRIVER harus diisi: mysql atau postgres")
	}

	if errConnection != nil {
		panic("failed to connect database")
	}

	log.Println("Connected to database")
}
