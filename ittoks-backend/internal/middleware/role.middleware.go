package middleware

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func RoleAdmin() gin.HandlerFunc {
	return func(c *gin.Context) {
		role := c.GetString("role")
		if role != "admin" {
			c.AbortWithStatusJSON(http.StatusForbidden, gin.H{
				"error": "admin access only",
			})
			return
		}
		c.Next()
	}
}
