package config

import (
	"log"
	"os"

	"github.com/joho/godotenv"
)

// Variables to hold environment configuration
var (
	LocalDatabaseUrl string
	LocalAPIUrl      string
	AdminUser        string
	AdminPassword    string
	UserUser         string
	UserPassword     string
	DefaultUser      string
	DefaultPassword  string
)

func init() {
	// Load environment variables from .env file
	if err := godotenv.Load("../.env"); err != nil {
		log.Fatal("Error loading .env file:", err)
	}

	// Set package-level variables
	LocalDatabaseUrl = os.Getenv("LOCAL_DATABASE_URL")
	LocalAPIUrl = os.Getenv("LOCAL_API_URL")
	AdminUser = os.Getenv("ADMIN_USER")
	AdminPassword = os.Getenv("ADMIN_PASSWORD")
	UserUser = os.Getenv("USER_USER")
	UserPassword = os.Getenv("USER_PASSWORD")
	DefaultUser = os.Getenv("DEFAULT_USER")
	DefaultPassword = os.Getenv("DEFAULT_PASSWORD")
}
