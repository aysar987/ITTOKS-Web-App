package handler

import (
	"net/http"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type SiswaHandler struct {
	service *service.SiswaService
}

func NewSiswaHandler(service *service.SiswaService) *SiswaHandler {
	return &SiswaHandler{service: service}
}

func (h *SiswaHandler) Create(c *gin.Context) {
	var req domain.Siswa
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(c.Request.Context(), &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "siswa created"})
}

func (h *SiswaHandler) List(c *gin.Context) {
	kelasID := c.Query("kelas_id")
	tahunAjar := c.Query("tahun_ajar")
	semester := c.Query("semester")

	data, err := h.service.List(c, kelasID, tahunAjar, semester)
	if err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, data)
}

func (h *SiswaHandler) Delete(c *gin.Context) {
	id := c.Param("id")

	if err := h.service.Delete(c.Request.Context(), id); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "siswa deleted"})
}
