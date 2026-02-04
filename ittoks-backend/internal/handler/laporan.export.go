package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"
)

func (h *LaporanHandler) ExportExcel(c *gin.Context) {
	kelas := c.Query("kelas_id")
	tahun := c.Query("tahun_ajar")
	semester := c.Query("semester")

	data, err := h.service.GetRekap(c, kelas, tahun, semester)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	f := excelize.NewFile()
	sheet := "Laporan"
	f.SetSheetName("Sheet1", sheet)

	headers := []string{
		"No",
		"NIS / ID",
		"Nama",
		"Kelas",
		"Rata-rata Nilai",
		"Hadir",
		"Izin",
		"Sakit",
		"Alpha",
		"% Kehadiran",
	}

	for i, h := range headers {
		cell, _ := excelize.CoordinatesToCellName(i+1, 1)
		f.SetCellValue(sheet, cell, h)
	}

	for i, row := range data {
		r := i + 2
		f.SetCellValue(sheet, fmt.Sprintf("A%d", r), i+1)
		f.SetCellValue(sheet, fmt.Sprintf("B%d", r), row.SiswaID)
		f.SetCellValue(sheet, fmt.Sprintf("C%d", r), row.Nama)
		f.SetCellValue(sheet, fmt.Sprintf("D%d", r), row.KelasID)
		f.SetCellValue(sheet, fmt.Sprintf("E%d", r), row.AverageScore)
		f.SetCellValue(sheet, fmt.Sprintf("F%d", r), row.Hadir)
		f.SetCellValue(sheet, fmt.Sprintf("G%d", r), row.Izin)
		f.SetCellValue(sheet, fmt.Sprintf("H%d", r), row.Sakit)
		f.SetCellValue(sheet, fmt.Sprintf("I%d", r), row.Alpha)
		f.SetCellValue(sheet, fmt.Sprintf("J%d", r), row.PersentaseHadir)
	}

	filename := fmt.Sprintf(
		"laporan_%s_%s_%s.xlsx",
		kelas, tahun, semester,
	)

	c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")
	c.Header("Content-Disposition", "attachment; filename="+filename)

	_ = f.Write(c.Writer)
}
