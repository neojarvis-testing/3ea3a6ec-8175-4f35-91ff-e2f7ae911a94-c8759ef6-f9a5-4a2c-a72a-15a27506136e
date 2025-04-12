using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using dotnetapp.Data;
using dotnetapp.Models;

namespace dotnetapp.Services
{
    public class AuthService : IAuthService
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _context;

        public AuthService(
            UserManager<ApplicationUser> userManager,
            RoleManager<IdentityRole> roleManager,
            IConfiguration configuration,
            ApplicationDbContext context)
        {
            _userManager = userManager;
            _roleManager = roleManager;
            _configuration = configuration;
            _context = context;
        }

        // Registration method
        public async Task<(int, string)> Registration(User model, string role)
        {
            var userExists = await _userManager.FindByEmailAsync(model.Email);
            if (userExists != null)
            {
                return (0, "User already exists");
            }

            // Ensure the Name property is properly set
            ApplicationUser user = new ApplicationUser()
            {
                Email = model.Email,
                SecurityStamp = Guid.NewGuid().ToString(),
                UserName = model.Username,
                Name = model.Name // Set the Name property explicitly
            };

            var result = await _userManager.CreateAsync(user, model.Password);
            if (!result.Succeeded)
            {
                return (0, "User creation failed! Please check user details and try again");
            }

            if (!await _roleManager.RoleExistsAsync(role))
            {
                await _roleManager.CreateAsync(new IdentityRole(role));
            }

            if (await _roleManager.RoleExistsAsync(role))
            {
                await _userManager.AddToRoleAsync(user, role);
            }

            return (1, "User created successfully!");
        }

        // Login method
    public async Task<(int, string)> Login(LoginModel model)
    {
    // Validate input
    if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
    {
        return (0, "Email or password cannot be null or empty.");
    }

    // Check if the user exists
    var user = await _userManager.FindByEmailAsync(model.Email);
    if (user == null)
    {
        return (0, "Invalid email.");
    }

    // Verify password
    if (!await _userManager.CheckPasswordAsync(user, model.Password))
    {
        return (0, "Invalid password.");
    }

    // Generate claims for the JWT token
    var userRoles = await _userManager.GetRolesAsync(user);
    var authClaims = new List<Claim>
    {
        new Claim(ClaimTypes.Name, user.UserName),
        new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
    };

    foreach (var userRole in userRoles)
    {
        authClaims.Add(new Claim(ClaimTypes.Role, userRole));
    }

    // Generate and return the token
    string token = GenerateToken(authClaims);
    return (1, token);
    }

        // Method to generate JWT token
        private string GenerateToken(IEnumerable<Claim> claims)
    {
        if (claims == null || !claims.Any())
        {
            throw new ArgumentException("Claims cannot be null or empty.", nameof(claims));
        }

        var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Secret"]));
        var token = new JwtSecurityToken(
            issuer: _configuration["JWT:ValidIssuer"],
            audience: _configuration["JWT:ValidAudience"],
            expires: DateTime.Now.AddHours(3),
            claims: claims,
            signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
        );

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
    }
}