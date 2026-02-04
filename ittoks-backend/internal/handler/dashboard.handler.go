package handler

import (
	"net/http"

	"context"

	"ittoks-backend/internal/domain"

	"github.com/gin-gonic/gin"
)

type DashboardService interface {
	GetSummary(ctx context.Context) (*domain.DashboardSummary, error)
	GetCharts(ctx context.Context) (*domain.DashboardCharts, error)
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

func (h *DashboardHandler) GetCharts(c *gin.Context) {
	data, err := h.service.GetCharts(c)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}
	c.JSON(200, data)
}
