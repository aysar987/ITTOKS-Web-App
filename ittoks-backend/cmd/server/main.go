package main

import (
	"context"
	"log"
	"os"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"

	"ittoks-backend/internal/config"
	"ittoks-backend/internal/handler"
	"ittoks-backend/internal/middleware"
	"ittoks-backend/internal/repository"
	"ittoks-backend/internal/service"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("❌ Failed to load .env file")

	}

	if err := config.InitFirebase(); err != nil {
		log.Fatal("❌ Failed to init Firebase:", err)
	}

	ctx := context.Background()
	db, err := config.FirebaseApp.Firestore(ctx)
	if err != nil {
		log.Fatal("❌ Failed to init Firestore:", err)
	}
	defer db.Close()

	r := gin.Default()

	r.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"status":  "ok",
			"service": "ittoks-backend",
		})
	})

	api := r.Group("/api")
	api.Use(middleware.FirebaseAuth())
	siswaRepo := repository.NewSiswaFirestoreRepo(db)
	siswaService := service.NewSiswaService(siswaRepo)
	siswaHandler := handler.NewSiswaHandler(siswaService)

	siswa := api.Group("/students")
	siswa.POST("", siswaHandler.Create)
	siswa.GET("", siswaHandler.List)
	siswa.PUT("/:studentId", siswaHandler.Update)
	siswa.DELETE("/:studentId", siswaHandler.Delete)

	assessmentRepo := repository.NewAssessmentRepo(db)
	assessmentService := service.NewAssessmentService(assessmentRepo)
	assessmentHandler := handler.NewAssessmentHandler(assessmentService)

	assessments := api.Group("/students/:studentId/assessments")
	assessments.POST("", assessmentHandler.Create)
	assessments.GET("", assessmentHandler.ListByStudent)
	assessments.PUT("/:assessmentId", assessmentHandler.Update)
	assessments.DELETE("/:assessmentId", assessmentHandler.Delete)

	absensiRepo := repository.NewAbsensiRepository(db)
	absensiService := service.NewAbsensiService(absensiRepo)
	absensiHandler := handler.NewAbsensiHandler(absensiService)

	absensi := api.Group("/absensi")
	absensi.POST("", absensiHandler.Create)
	absensi.GET("", absensiHandler.List)
	absensi.PUT("/:id", absensiHandler.Update)

	nilaiRepo := repository.NewNilaiRepository(db)
	nilaiService := service.NewNilaiService(nilaiRepo)
	nilaiHandler := handler.NewNilaiHandler(nilaiService)

	nilai := api.Group("/nilai")
	nilai.POST("", nilaiHandler.Create)
	nilai.GET("/siswa/:siswa_id", nilaiHandler.GetBySiswa)

	dashboardRepo := repository.NewDashboardRepository(db)
	dashboardService := service.NewDashboardService(dashboardRepo)
	dashboardHandler := handler.NewDashboardHandler(dashboardService)

	dashboard := api.Group("/dashboard")
	dashboard.GET("/summary", dashboardHandler.GetSummary)

	api.GET("/me", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"uid":   c.GetString("uid"),
			"email": c.GetString("email"),
		})
	})

	settingRepo := repository.NewSettingRepository(db)
	settingService := service.NewSettingService(settingRepo)
	settingHandler := handler.NewSettingHandler(settingService)

	setting := api.Group("/setting")
	setting.Use(middleware.RoleAdmin())

	setting.POST("/grading-weight", settingHandler.SetGradingWeight)

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Println("🚀 Server running on port", port)
	r.Run(":" + port)
}
