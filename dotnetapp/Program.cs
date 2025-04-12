using dotnetapp.Models; 
using Microsoft.EntityFrameworkCore; 
using System.Buffers; 
using System.Data.SqlClient; 
using System.Linq; 
using System.Runtime.Intrinsics.X86; 
using System.Text; 
using System.Configuration; 
using Microsoft.AspNetCore.Authentication.JwtBearer; 
using Microsoft.IdentityModel.Tokens; 
using Microsoft.AspNetCore.Identity;
using dotnetapp.Models;
using dotnetapp.Data;
using Microsoft.EntityFrameworkCore;
using dotnetapp.Services;

var builder = WebApplication.CreateBuilder(args); 

// Add services to the container. 

builder.Services.AddControllers() 
    .AddJsonOptions(opt=> { 
      opt.JsonSerializerOptions.PropertyNamingPolicy=null; 
    }); 
    

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle 

builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen(); 
builder.Services.AddDbContext<ApplicationDbContext>(op=>op.UseSqlServer(builder.Configuration.GetConnectionString("conn"))); 
builder.Services.AddCors(opttions=>{ 
  opttions.AddDefaultPolicy(builder=>{ 
    builder.AllowAnyOrigin() 
    .AllowAnyHeader() 
    .AllowAnyMethod(); 
  }); 
}); 

var key=Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Key"]); 

builder.Services.AddAuthentication(x=>{ 
  x.DefaultAuthenticateScheme=JwtBearerDefaults.AuthenticationScheme; 
  x.DefaultChallengeScheme=JwtBearerDefaults.AuthenticationScheme; 
}).AddJwtBearer(x=>{ 
  x.RequireHttpsMetadata=false; 
  x.SaveToken=true; 
  x.TokenValidationParameters=new TokenValidationParameters{ 
    ValidateIssuer=true, 
    ValidateAudience=true, 
    ValidateIssuerSigningKey=true, 
    ValidIssuer=builder.Configuration["Jwt:Issuer"], 
    ValidAudience=builder.Configuration["Jwt:Issuer"], 
    IssuerSigningKey=new SymmetricSecurityKey(key) 
  }; 
}); 

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<ApplicationDbContext>()
    .AddDefaultTokenProviders();

// Register custom services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<FeedbackService>();
builder.Services.AddScoped<LoanService>();
builder.Services.AddScoped<LoanApplicationService>();
 
var app = builder.Build(); 

// Configure the HTTP request pipeline. 
if (app.Environment.IsDevelopment()) 
{ 
  app.UseSwagger(); 
  app.UseSwaggerUI(); 
} 
app.UseHttpsRedirection(); 
app.UseAuthentication(); 
app.UseAuthorization(); 

app.UseCors(); 

app.MapControllers(); 

app.Run(); 