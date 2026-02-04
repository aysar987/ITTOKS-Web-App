package service

import (
	"context"

	"math"
	"sort"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/repository"
)

type LaporanService struct {
	laporanRepo *repository.LaporanRepository
	absensiRepo *repository.AbsensiRepository
}

func NewLaporanService(
	laporanRepo *repository.LaporanRepository,
	absensiRepo *repository.AbsensiRepository,
) *LaporanService {
	return &LaporanService{
		laporanRepo: laporanRepo,
		absensiRepo: absensiRepo,
	}
}

func (s *LaporanService) GetRekap(
	ctx context.Context,
	kelas, tahun, semester string,
) ([]domain.LaporanSiswa, error) {

	data, err := s.laporanRepo.GetRekap(ctx, kelas, tahun, semester)
	if err != nil {
		return nil, err
	}

	for i := range data {
		hadir, izin, alpha, err :=
			s.absensiRepo.CountBySiswa(ctx, data[i].SiswaID)
		if err != nil {
			return nil, err
		}

		total := data[i].Hadir + data[i].Alpha + data[i].Izin + data[i].Sakit
		if total > 0 {
			p := float64(data[i].Hadir) / float64(total) * 100
			data[i].PersentaseHadir = math.Round(p*100) / 100
		}

		data[i].Hadir = hadir
		data[i].Izin = izin
		data[i].Alpha = alpha
	}
	sort.Slice(data, func(i, j int) bool {
		if data[i].AverageScore == data[j].AverageScore {
			return data[i].Nama < data[j].Nama
		}
		return data[i].AverageScore > data[j].AverageScore
	})

	return data, nil
}
