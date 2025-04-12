using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;

public class LoanApplicationService
{
    private readonly ApplicationDbContext _context;

    public LoanApplicationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LoanApplication>> GetAllLoanApplications()
    {
        return await _context.LoanApplications.ToListAsync();
    }

    public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(int userId)
    {
        return await _context.LoanApplications
            .Where(la => la.UserId == userId)
            .ToListAsync();
    }

    public async Task<bool> AddLoanApplication(LoanApplication loanApplication)
    {
        var existingLoan = await _context.LoanApplications
            .FirstOrDefaultAsync(la => la.LoanId == loanApplication.LoanId && la.UserId == loanApplication.UserId);

        if (existingLoan != null)
        {
            throw new LoanException("User already applied for this loan");
        }

        _context.LoanApplications.Add(loanApplication);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UpdateLoanApplication(int loanApplicationId, LoanApplication loanApplication)
    {
        var existingLoanApplication = await _context.LoanApplications
            .FirstOrDefaultAsync(la => la.Id == loanApplicationId);

        if (existingLoanApplication == null)
        {
            return false;
        }

        existingLoanApplication.LoanAmount = loanApplication.LoanAmount;
        existingLoanApplication.Status = loanApplication.Status;
       

        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteLoanApplication(int loanApplicationId)
    {
        var existingLoanApplication = await _context.LoanApplications
            .FirstOrDefaultAsync(la => la.Id == loanApplicationId);

        if (existingLoanApplication == null)
        {
            return false;
        }

        _context.LoanApplications.Remove(existingLoanApplication);
        await _context.SaveChangesAsync();
        return true;
    }
}
