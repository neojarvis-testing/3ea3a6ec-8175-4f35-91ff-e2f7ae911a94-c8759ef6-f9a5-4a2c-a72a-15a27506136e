using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using dotnetapp.Models;
using dotnetapp.Services;

namespace dotnetapp.Controllers
{
    [ApiController]
    [Route("api/")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authService;
        public AuthenticationController(IAuthService authService)
        {
            _authService = authService;
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(new { Message = "Invalid login request." });
                }
                var (statusCode, responseMessage) = await _authService.Login(model);
                if(statusCode == 1)
                {
                    return Ok(new { token = responseMessage});
                }
                return Unauthorized(responseMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred during login: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while processing your login request." });
            }
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User model)
        {   
            try
            {
                if(!ModelState.IsValid)
                {
                    return BadRequest(new { Message = "Invalid registration request."});
                }
                var (statusCode, responseMessage) = await _authService.Registration(model, model.UserRole);
                Console.WriteLine(statusCode);
                Console.WriteLine(responseMessage);
                if(statusCode == 1)
                {
                    return Ok(new {message = responseMessage});
                }
                Console.WriteLine(responseMessage);
                return BadRequest(responseMessage);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred during registration: {ex.Message}");
                return StatusCode(500, new { Message = "An error occurred while processing your registration request." });
            }
        }
    }
}