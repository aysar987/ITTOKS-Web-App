package handler

import (
	"net/http"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type NilaiHandler struct {
	service service.NilaiService
}

func NewNilaiHandler(s service.NilaiService) *NilaiHandler {
	return &NilaiHandler{s}
}

func (h *NilaiHandler) Create(c *gin.Context) {
	var req domain.Nilai
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(c, &req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "nilai created"})
}

func (h *NilaiHandler) GetBySiswa(c *gin.Context) {
	siswaID := c.Param("siswa_id")
	data, err := h.service.GetBySiswa(c, siswaID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	c.JSON(http.StatusOK, data)
}
