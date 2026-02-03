package handler

import (
	"net/http"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type AbsensiHandler struct {
	service *service.AbsensiService
}

func NewAbsensiHandler(s *service.AbsensiService) *AbsensiHandler {
	return &AbsensiHandler{s}
}

func (h *AbsensiHandler) Create(c *gin.Context) {
	var req domain.Absensi
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(c, &req); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{"message": "absensi created"})
}

func (h *AbsensiHandler) List(c *gin.Context) {
	kelas := c.Query("kelas_id")
	tanggal := c.Query("tanggal")

	data, err := h.service.List(c, kelas, tanggal)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, data)
}

func (h *AbsensiHandler) Update(c *gin.Context) {
	id := c.Param("id")
	var req struct {
		Status string `json:"status"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Update(c, id, req.Status); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusOK, gin.H{"message": "absensi updated"})
}
