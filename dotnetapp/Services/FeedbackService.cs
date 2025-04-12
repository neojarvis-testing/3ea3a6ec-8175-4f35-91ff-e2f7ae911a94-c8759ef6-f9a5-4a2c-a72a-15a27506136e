

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using dotnetapp.Data;
using dotnetapp.Models;

public class FeedbackService
{
    private readonly ApplicationDbContext _context;

    public FeedbackService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
    {
        return await _context.Feedbacks.ToListAsync();
    }

    public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
    {
        return await _context.Feedbacks
            .Where(f => f.UserId == userId)
            .ToListAsync();
    }

    public async Task<bool> AddFeedback(Feedback feedback)
    {
        _context.Feedbacks.Add(feedback);
        await _context.SaveChangesAsync();
        return true;
    }

    public async Task<bool> DeleteFeedback(int feedbackId)
    {
        var existingFeedback = await _context.Feedbacks
            .FirstOrDefaultAsync(f => f.Id == feedbackId);

        if (existingFeedback == null)
        {
            return false;
        }

        _context.Feedbacks.Remove(existingFeedback);
        await _context.SaveChangesAsync();
        return true;
    }
}