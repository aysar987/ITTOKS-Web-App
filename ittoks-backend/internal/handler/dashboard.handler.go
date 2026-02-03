package handler

import (
	"net/http"

	"context"

	"ittoks-backend/internal/domain"

	"github.com/gin-gonic/gin"
)

type DashboardService interface {
	GetSummary(ctx context.Context) (*domain.DashboardSummary, error)
}

type DashboardHandler struct {
	service DashboardService
}

func NewDashboardHandler(s DashboardService) *DashboardHandler {
	return &DashboardHandler{service: s}
}

func (h *DashboardHandler) GetSummary(c *gin.Context) {
	data, err := h.service.GetSummary(c)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}
