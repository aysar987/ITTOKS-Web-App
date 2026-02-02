package middleware

import (
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"

	"ittoks-backend/internal/config"
)

func FirebaseAuth() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "missing authorization header",
			})
			return
		}

		tokenString := strings.Replace(authHeader, "Bearer ", "", 1)

		client, err := config.FirebaseApp.Auth(c)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusInternalServerError, gin.H{
				"error": "firebase auth init failed",
			})
			return
		}

		token, err := client.VerifyIDToken(c, tokenString)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": "invalid token",
			})
			return
		}

		c.Set("uid", token.UID)
		c.Set("email", token.Claims["email"])

		c.Next()
	}
}
