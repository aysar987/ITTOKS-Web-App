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

func NewSiswaHandler(s *service.SiswaService) *SiswaHandler {
	return &SiswaHandler{s}
}

func (h *SiswaHandler) Create(c *gin.Context) {
	var body domain.Siswa
	if err := c.ShouldBindJSON(&body); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.CreateSiswa(body); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "siswa created"})
}

func (h *SiswaHandler) GetAll(c *gin.Context) {
	data, err := h.service.GetAll()
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}
