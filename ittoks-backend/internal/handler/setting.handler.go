package handler

import (
	"net/http"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type SettingHandler struct {
	service *service.SettingService
}

func NewSettingHandler(s *service.SettingService) *SettingHandler {
	return &SettingHandler{s}
}

func (h *SettingHandler) SetGradingWeight(c *gin.Context) {
	var body domain.GradingWeight
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.SetGradingWeight(body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "grading weight updated"})
}
