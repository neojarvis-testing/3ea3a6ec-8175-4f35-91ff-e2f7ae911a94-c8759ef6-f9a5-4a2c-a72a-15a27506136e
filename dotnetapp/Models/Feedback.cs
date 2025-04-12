using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class Feedback
    {
        [Key]
        public int FeedbackId { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }
        
        public User? User { get; set; }

        [Required(ErrorMessage = "Feedback text is required.")]
        [MaxLength(100, ErrorMessage = "Feedback text cannot exceed 100 characters.")]
        public string FeedbackText { get; set; }

        [Required(ErrorMessage = "Date is required.")]
        [DataType(DataType.DateTime, ErrorMessage = "Invalid date format.")]
        public DateTime Date { get; set; }
    }
}