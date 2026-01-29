package middleware

import (
	"net/http"
	"strings"

	"firebase.google.com/go/auth"
	"github.com/gin-gonic/gin"
)

func AuthMiddleware(authClient *auth.Client) gin.HandlerFunc {
	return func(c *gin.Context) {
		token := c.GetHeader("Authorization")
		if token == "" {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "missing token"})
			return
		}

		idToken := strings.Replace(token, "Bearer ", "", 1)

		decoded, err := authClient.VerifyIDToken(c, idToken)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{"error": "invalid token"})
			return
		}

		c.Set("uid", decoded.UID)
		c.Set("role", decoded.Claims["role"])
		c.Next()
	}
}
