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
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState); // Validate input model
    }

    try
    {
        var (status, token) = await _authService.Login(model);
        if (status == 0)
        {
            return BadRequest(new { Success = false, Message = token });
        }
        return Ok(new { Success = true, Token = token });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { Success = false, Message = "An unexpected error occurred.", Details = ex.Message });
    }
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] User model)
    {
    if (!ModelState.IsValid)
    {
        return BadRequest(ModelState); // Validate input model
    }

    try
    {
        var (status, message) = await _authService.Registration(model, model.UserRole);
        if (status == 0)
        {
            return BadRequest(new { Success = false, Message = message });
        }
        return Ok(new { Success = true, Message = message });
    }
    catch (ArgumentException ex)
    {
        return BadRequest(new { Success = false, Message = ex.Message });
    }
    catch (Exception ex)
    {
        return StatusCode(500, new { Success = false, Message = "An unexpected error occurred.", Details = ex.Message });
    }
    }
}
}
