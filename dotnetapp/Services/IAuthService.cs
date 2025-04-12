using System.Threading.Tasks;
using dotnetapp.Models;
using dotnetapp.Data;

namespace dotnetapp.Services{
public interface IAuthService
{
    Task<(int, string)> Registration(User model, string role);
    Task<(int, string)> Login(LoginModel model);
}
}
