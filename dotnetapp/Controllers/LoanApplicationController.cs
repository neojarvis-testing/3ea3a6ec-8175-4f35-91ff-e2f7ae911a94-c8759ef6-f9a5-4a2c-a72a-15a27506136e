using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Exceptions; 
using dotnetapp.Services;
using dotnetapp.Models;
using dotnetapp.Data;
namespace dotnetapp.Controllers{
[ApiController]
[Route("api/[controller]")]
public class LoanApplicationController : ControllerBase
{
    private readonly LoanApplicationService _loanApplicationService;

    public LoanApplicationController(LoanApplicationService loanApplicationService)
    {
        _loanApplicationService = loanApplicationService;
    }

    [HttpGet("GetAllLoanApplications")]
    public async Task<ActionResult<IEnumerable<LoanApplication>>> GetAllLoanApplications()
    {
        try
        {
            var loanApplications = await _loanApplicationService.GetAllLoanApplications();
            return Ok(loanApplications);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("GetLoanApplicationsByUserId/{userId}")]
    public async Task<ActionResult<IEnumerable<LoanApplication>>> GetLoanApplicationByUserId(int userId)
    {
        try
        {
            var loanApplications = await _loanApplicationService.GetLoanApplicationsByUserId(userId);
            if (loanApplications == null || !loanApplications.Any())
            {
                return NotFound("Cannot find any loan application");
            }
            return Ok(loanApplications);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("AddLoanApplication")]
    public async Task<ActionResult> AddLoanApplication([FromBody] LoanApplication loanApplication)
    {
        try
        {
            var isAdded = await _loanApplicationService.AddLoanApplication(loanApplication);
            if (isAdded)
            {
                return Ok("Loan application added successfully");
            }
            return BadRequest("Failed to add loan application");
        }
        catch (LoanException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPut("UpdateLoanApplication/{loanApplicationId}")]
    public async Task<ActionResult> UpdateLoanApplication(int loanApplicationId, [FromBody] LoanApplication loanApplication)
    {
        try
        {
            var isUpdated = await _loanApplicationService.UpdateLoanApplication(loanApplicationId, loanApplication);
            if (isUpdated)
            {
                return Ok("Loan application updated successfully");
            }
            return NotFound("Cannot find any loan application");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpDelete("DeleteLoanApplication/{loanApplicationId}")]
    public async Task<ActionResult> DeleteLoanApplication(int loanApplicationId)
    {
        try
        {
            var isDeleted = await _loanApplicationService.DeleteLoanApplication(loanApplicationId);
            if (isDeleted)
            {
                return Ok("Loan application deleted successfully");
            }
            return NotFound("Cannot find any loan application");
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
}

