using System;
using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace dotnetapp.Models
{
    public class LoanApplication
    {   
        [Key]
        public int LoanApplicationId { get; set; }

        [Required(ErrorMessage = "User ID is required.")]
        public int UserId { get; set; }

        public User? User { get; set; }

        [Required(ErrorMessage = "Loan ID is required.")]
        public int LoanId { get; set; } 

        public Loan? Loan { get; set; }

        [Required(ErrorMessage = "Submission date is required.")]
        [DataType(DataType.DateTime)]
        public DateTime SubmissionDate { get; set; }

        [Required(ErrorMessage = "Loan status is required.")]
        public int LoanStatus { get; set; }

        [Required(ErrorMessage = "Farm location is required.")]
        [MaxLength(100, ErrorMessage = "Farm location cannot exceed 100 characters.")]
        public string FarmLocation { get; set; }

        [Required(ErrorMessage = "Farmer address is required.")]
        [MaxLength(100, ErrorMessage = "Farmer address cannot exceed 100 characters.")]
        public string FarmerAddress { get; set; }

        [Required(ErrorMessage = "Farm size is required.")]
        [Range(0.1, double.MaxValue, ErrorMessage = "Farm size must be greater than 0.")]
        public decimal FarmSizeInAcres { get; set; }

        [Required(ErrorMessage = "Farm purpose is required.")]
        [MaxLength(100, ErrorMessage = "Farm purpose cannot exceed 100 characters.")]
        public string FarmPurpose { get; set; }

        [Required(ErrorMessage = "File is required.")]
        [MaxLength(100, ErrorMessage = "File path cannot exceed 100 characters.")]
        public string File { get; set; }
    }
}