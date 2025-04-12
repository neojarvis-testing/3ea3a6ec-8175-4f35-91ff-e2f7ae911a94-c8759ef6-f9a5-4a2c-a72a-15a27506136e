using System.Threading.Tasks;
using dotnetapp.Models;

public interface IAuthService
{
    Task<(int, string)> Registration(User model, string role);
    Task<(int, string)> Login(LoginModel model);
}
