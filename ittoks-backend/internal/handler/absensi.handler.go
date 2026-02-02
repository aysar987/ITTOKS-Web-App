package handler

import "github.com/gin-gonic/gin"

type AbsensiHandler struct{}

func NewAbsensiHandler() *AbsensiHandler {
	return &AbsensiHandler{}
}

func (h *AbsensiHandler) Dummy(c *gin.Context) {
	c.JSON(200, gin.H{"message": "absensi ready"})
}
