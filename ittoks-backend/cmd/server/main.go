package main

import (
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"ittoks-backend/internal/config"
)

func main() {

	err := godotenv.Load()
	if err != nil {
		log.Fatal("❌ Failed to load .env file")
	}

	err = config.InitFirebase()
	if err != nil {
		log.Fatal("❌ Failed to init Firebase:", err)
	}

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "ittoks-backend",
		})
	})

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("🚀 Server running on port", port)
	r.Run(":" + port)
}
