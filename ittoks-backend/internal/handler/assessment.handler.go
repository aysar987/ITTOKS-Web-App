package handler

import (
	"net/http"

	"github.com/gin-gonic/gin"

	"ittoks-backend/internal/domain"
	"ittoks-backend/internal/service"
)

type AssessmentHandler struct {
	service *service.AssessmentService
}

func NewAssessmentHandler(s *service.AssessmentService) *AssessmentHandler {
	return &AssessmentHandler{service: s}
}

func (h *AssessmentHandler) Create(c *gin.Context) {
	studentID := c.Param("studentId")

	var payload domain.Assessment
	if err := c.ShouldBindJSON(&payload); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Create(c, studentID, &payload); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	c.JSON(http.StatusCreated, gin.H{
		"message": "assessment added",
	})
}

func (h *AssessmentHandler) ListByStudent(c *gin.Context) {
	studentID := c.Param("studentId")

	data, err := h.service.ListByStudent(c, studentID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, data)
}

func (h *AssessmentHandler) Update(c *gin.Context) {
	studentID := c.Param("studentId")
	assessmentID := c.Param("assessmentId")

	var req struct {
		Score float64 `json:"score"`
	}

	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(400, gin.H{"error": err.Error()})
		return
	}

	if err := h.service.Update(c, studentID, assessmentID, req.Score); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "assessment updated"})
}

func (h *AssessmentHandler) Delete(c *gin.Context) {
	studentID := c.Param("studentId")
	assessmentID := c.Param("assessmentId")

	if err := h.service.Delete(c, studentID, assessmentID); err != nil {
		c.JSON(500, gin.H{"error": err.Error()})
		return
	}

	c.JSON(200, gin.H{"message": "assessment deleted"})
}
