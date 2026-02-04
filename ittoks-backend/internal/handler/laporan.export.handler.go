package handler

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/xuri/excelize/v2"

	"ittoks-backend/internal/service"
)

type LaporanExportHandler struct {
	service *service.LaporanService
}

func NewLaporanExportHandler(s *service.LaporanService) *LaporanExportHandler {
	return &LaporanExportHandler{s}
}

func (h *LaporanExportHandler) ExportExcel(c *gin.Context) {
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
		"Siswa ID",
		"Nama",
		"Kelas",
		"Rata-rata Nilai",
		"Hadir",
		"Izin",
		"Sakit",
		"Persentase Hadir",
	}

	for i, h := range headers {
		cell, _ := excelize.CoordinatesToCellName(i+1, 1)
		f.SetCellValue(sheet, cell, h)
	}

	headerStyle, _ := f.NewStyle(&excelize.Style{
		Font: &excelize.Font{Bold: true},
	})
	f.SetCellStyle(sheet, "A1", "H1", headerStyle)

	cols := []string{"A", "B", "C", "D", "E", "F", "G", "H"}
	for _, col := range cols {
		_ = f.SetColWidth(sheet, col, col, 20)
	}

	percentStyle, _ := f.NewStyle(&excelize.Style{
		NumFmt: 10,
	})

	for i, d := range data {
		row := i + 2

		f.SetCellValue(sheet, fmt.Sprintf("A%d", row), d.SiswaID)
		f.SetCellValue(sheet, fmt.Sprintf("B%d", row), d.Nama)
		f.SetCellValue(sheet, fmt.Sprintf("C%d", row), d.KelasID)
		f.SetCellValue(sheet, fmt.Sprintf("D%d", row), d.AverageScore)
		f.SetCellValue(sheet, fmt.Sprintf("E%d", row), d.Hadir)
		f.SetCellValue(sheet, fmt.Sprintf("F%d", row), d.Izin)
		f.SetCellValue(sheet, fmt.Sprintf("G%d", row), d.Sakit)

		f.SetCellValue(
			sheet,
			fmt.Sprintf("H%d", row),
			float64(d.PersentaseHadir)/100,
		)
	}

	lastRow := len(data) + 1
	f.SetCellStyle(
		sheet,
		fmt.Sprintf("H2"),
		fmt.Sprintf("H%d", lastRow),
		percentStyle,
	)

	_ = f.SetPanes(sheet, &excelize.Panes{
		Freeze:      true,
		Split:       true,
		XSplit:      0,
		YSplit:      1,
		TopLeftCell: "A2",
	})

	c.Header(
		"Content-Disposition",
		"attachment; filename=laporan.xlsx",
	)
	c.Header("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet")

	if err := f.Write(c.Writer); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
	}
}
