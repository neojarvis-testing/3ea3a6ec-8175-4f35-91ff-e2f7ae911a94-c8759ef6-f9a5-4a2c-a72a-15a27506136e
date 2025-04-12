using System;
using System.ComponentModel.DataAnnotations;

namespace dotnetapp.Models
{
    public class Loan
    {
        [Key]
        public int LoanId { get; set; }  

        [Required(ErrorMessage = "Loan type is required.")]
        [MaxLength(100, ErrorMessage = "Loan type cannot exceed 100 characters.")]
        public string LoanType { get; set; }  

        [Required(ErrorMessage = "Description is required.")]
        [MaxLength(100, ErrorMessage = "Description cannot exceed 100 characters.")]
        public string Description { get; set; }  
       
        [Required(ErrorMessage = "Interest rate is required.")]
        [Range(0.01,double.MaxValue, ErrorMessage = "Interest rate must be between 0 and 100.")]
        public decimal InterestRate { get; set; } 

        
        [Required(ErrorMessage = "Maximum loan amount is required.")]
        [Range(1, double.MaxValue, ErrorMessage = "Maximum amount must be greater than 0.")]
        public decimal MaximumAmount { get; set; }  

        
        [Required(ErrorMessage = "Repayment tenure is required.")]
        [Range(1, 100, ErrorMessage = "Repayment tenure must be between 1 and 100 months.")]
        public int RepaymentTenure { get; set; }  

       
        [Required(ErrorMessage = "Eligibility criteria is required.")]
        [MaxLength(100, ErrorMessage = "Eligibility criteria cannot exceed 100 characters.")]
        public string Eligibility { get; set; }  

        
        [Required(ErrorMessage = "Documents required are mandatory.")]
        [MaxLength(100, ErrorMessage = "Documents required cannot exceed 100 characters.")]
        public string DocumentsRequired { get; set; }
    }
}