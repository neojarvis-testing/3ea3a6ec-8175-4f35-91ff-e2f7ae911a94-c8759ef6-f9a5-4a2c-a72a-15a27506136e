using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Exceptions;

namespace dotnetapp.Services{
public class LoanApplicationService
{
    private readonly ApplicationDbContext _context;

    public LoanApplicationService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<LoanApplication>> GetAllLoanApplications()
    {
        return await _context.LoanApplications.Include(u=>u.Loan).Include(i=>i.User).ToListAsync();
    }

    public async Task<IEnumerable<LoanApplication>> GetLoanApplicationsByUserId(int userId)
    {
        return await _context.LoanApplications
            .Where(la => la.UserId == userId).Include(u=>u.Loan)
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
        .FirstOrDefaultAsync(la => la.LoanApplicationId == loanApplicationId);

    if (existingLoanApplication == null)
    {
        return false;
    }

    // Update all relevant fields
    existingLoanApplication.LoanStatus = loanApplication.LoanStatus;
    existingLoanApplication.FarmLocation = loanApplication.FarmLocation;
    existingLoanApplication.FarmerAddress = loanApplication.FarmerAddress;
    existingLoanApplication.FarmSizeInAcres = loanApplication.FarmSizeInAcres;
    existingLoanApplication.FarmPurpose = loanApplication.FarmPurpose;
    existingLoanApplication.SubmissionDate = loanApplication.SubmissionDate;
    existingLoanApplication.File = loanApplication.File; 

    await _context.SaveChangesAsync();
    return true;
    }

    public async Task<bool> DeleteLoanApplication(int loanApplicationId)
    {
        var existingLoanApplication = await _context.LoanApplications
            .FirstOrDefaultAsync(la => la.LoanApplicationId == loanApplicationId);

        if (existingLoanApplication == null)
        {
            return false;
        }

        _context.LoanApplications.Remove(existingLoanApplication);
        await _context.SaveChangesAsync();
        return true;
    }
}
}