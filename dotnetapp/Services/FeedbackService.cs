using dotnetapp.Data;
using dotnetapp.Models;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
 
namespace dotnetapp.Services
{
    public class FeedbackService
    {
        private readonly ApplicationDbContext _context;
 
        public FeedbackService(ApplicationDbContext context)
        {
            _context = context;
        }
 
        // Retrieves all feedbacks from the database.
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _context.Feedbacks.Include(f => f.User).ToListAsync();
        }
 
        // Retrieves all feedbacks for a specific user.
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _context.Feedbacks
                .Where(f => f.UserId == userId)
                .Include(f => f.User)
                .ToListAsync();
        }
 
        // Adds new feedback to the database.
        public async Task<bool> AddFeedback(Feedback feedback)
        {
            _context.Feedbacks.Add(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
 
        // Deletes a feedback by ID.
        public async Task<bool> DeleteFeedback(int feedbackId)
        {
            var feedback = await _context.Feedbacks.FindAsync(feedbackId);
            if (feedback == null) return false;
 
            _context.Feedbacks.Remove(feedback);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}