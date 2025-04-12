using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class LoanController : ControllerBase
{
    private readonly LoanService _loanService;

    public LoanController(LoanService loanService)
    {
        _loanService = loanService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Loan>>> GetAllLoans()
    {
        try
        {
            var loans = await _loanService.GetAllLoans();
            return Ok(loans);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpGet("{loanId}")]
    public async Task<ActionResult<Loan>> GetLoanById(int loanId)
    {
        try
        {
            var loan = await _loanService.GetLoanById(loanId);
            if (loan == null)
            {
                return NotFound("Cannot find any loan");
            }
            return Ok(loan);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost]
    public async Task<ActionResult> AddLoan([FromBody] Loan loan)
    {
        try
        {
            var result = await _loanService.AddLoan(loan);
            if (result)
            {
                return Ok("Loan added successfully");
            }
            return StatusCode(500, "Failed to add loan");
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

    [HttpPut("{loanId}")]
    public async Task<ActionResult> UpdateLoan(int loanId, [FromBody] Loan loan)
    {
        try
        {
            var result = await _loanService.UpdateLoan(loanId, loan);
            if (result)
            {
                return Ok("Loan updated successfully");
            }
            return NotFound("Cannot find any loan");
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

    [HttpDelete("{loanId}")]
    public async Task<ActionResult> DeleteLoan(int loanId)
    {
        try
        {
            var result = await _loanService.DeleteLoan(loanId);
            if (result)
            {
                return Ok("Loan deleted successfully");
            }
            return NotFound("Cannot find any loan");
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
}
