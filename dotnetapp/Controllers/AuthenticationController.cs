using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Services;
using dotnetapp.Data;
using dotnetapp.Models;
namespace dotnetapp.Controllers
{
[ApiController]
[Route("api/[controller]")]
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
            var (status, token) = await _authService.Login(model);
            if (status == 0)
            {
                return BadRequest(token);
            }
            return Ok(new { Token = token });
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User model)
    {
        try
        {
            var (status, message) = await _authService.Registration(model, model.UserRole);
            if (status == 0)
            {
                return BadRequest(message);
            }
            return Ok(message);
        }
        catch (Exception ex)
        {
            return StatusCode(500, ex.Message);
        }
    }
}
}
