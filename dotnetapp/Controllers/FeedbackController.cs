using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Services;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly FeedbackService _feedbackService;

        // Constructor
        public FeedbackController(ApplicationDbContext context)
        {
            _feedbackService = new FeedbackService(context);
        }

        // Retrieves all feedbacks
        [HttpGet("all")]
        public async Task<IEnumerable<Feedback>> GetAllFeedbacks()
        {
            return await _feedbackService.GetAllFeedbacks();
        }

        // Retrieves feedbacks by UserId
        [HttpGet("user/{userId}")]
        public async Task<IEnumerable<Feedback>> GetFeedbacksByUserId(int userId)
        {
            return await _feedbackService.GetFeedbacksByUserId(userId);
        }

        // Adds new feedback
        [HttpPost("add")]
        public async Task<IActionResult> AddFeedback([FromBody] Feedback feedback)
        {
            var result = await _feedbackService.AddFeedback(feedback);
            if (result) return Ok("Feedback added successfully");
            return BadRequest("Failed to add feedback");
        }

        // Deletes feedback by FeedbackId
        [HttpDelete("delete/{feedbackId}")]
        public async Task<IActionResult> DeleteFeedback(int feedbackId)
        {
            var result = await _feedbackService.DeleteFeedback(feedbackId);
            if (result) return Ok("Feedback deleted successfully");
            return NotFound("Feedback not found");
        }
    }
}