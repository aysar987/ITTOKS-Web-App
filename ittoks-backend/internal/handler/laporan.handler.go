package handler

import (
	"net/http"

	"ittoks-backend/internal/service"

	"github.com/gin-gonic/gin"
)

type LaporanHandler struct {
	service *service.LaporanService
}

func NewLaporanHandler(s *service.LaporanService) *LaporanHandler {
	return &LaporanHandler{s}
}

func (h *LaporanHandler) GetRekap(c *gin.Context) {
	kelasID := c.Query("kelas_id")
	tahunAjar := c.Query("tahun_ajar")
	semester := c.Query("semester")

	if kelasID == "" || tahunAjar == "" || semester == "" {
		c.JSON(http.StatusBadRequest, gin.H{
			"message": "kelas_id, tahun_ajar, dan semester wajib diisi",
		})
		return
	}

	data, err := h.service.GetRekap(c, kelasID, tahunAjar, semester)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"message": "gagal mengambil laporan",
			"error":   err.Error(),
		})
		return
	}

	if data == nil {
		c.JSON(http.StatusOK, gin.H{
			"kelas_id":    kelasID,
			"tahun_ajar":  tahunAjar,
			"semester":    semester,
			"total_siswa": 0,
			"data":        []interface{}{},
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"kelas_id":    kelasID,
		"tahun_ajar":  tahunAjar,
		"semester":    semester,
		"total_siswa": len(data),
		"data":        data,
	})
}
