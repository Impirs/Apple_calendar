using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Data;
using UserManagementAPI.Models;
using System.Security.Cryptography;
using System.Text;

namespace UserManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly AppDbContext _context;

        public UsersController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("create")]
        public async Task<IActionResult> CreateUser([FromBody] User newUser)
        {
            if (string.IsNullOrWhiteSpace(newUser.Name) || string.IsNullOrWhiteSpace(newUser.Password))
            {
                return BadRequest("Username and password are required.");
            }

            // Проверка на уникальность имени
            var existingUser = await _context.users.FirstOrDefaultAsync(u => u.Name == newUser.Name);
            if (existingUser != null)
            {
                return BadRequest("Profile with this username already exists.");
            }

            newUser.Password = HashPassword(newUser.Password);
            newUser.UniqueId = GenerateUniqueId();

            _context.users.Add(newUser);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Profile created", unique_id = newUser.UniqueId });
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser([FromBody] User logUser)
        {
            // Console.WriteLine("Login attempt: " + logUser.Name + ", " + logUser.Password);

            if (logUser == null || string.IsNullOrWhiteSpace(logUser.Name) || string.IsNullOrWhiteSpace(logUser.Password))
            {
                return BadRequest("Username and password are required.");
            }

            var user = await _context.users.FirstOrDefaultAsync(u => u.Name == logUser.Name);
            if (user == null || user.Password != HashPassword(logUser.Password))
            {
                return Unauthorized("Incorrect data.");
            }

            return Ok(new { message = "User logged in successfully!", name = user.Name , unique_id = user.UniqueId });
        }

        [HttpPost("logout")]
        public IActionResult LogoutUser()
        {
            // Удаление уникального ID из сессии
            HttpContext.Session.Remove("UniqueId");

            return Ok(new { message = "Session finished." });
        }

        // Смена имени пользователя
        [HttpPut("update-name/{uniqueId}")]
        public async Task<IActionResult> UpdateUserName(string uniqueId, [FromBody] string newName)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.UniqueId == uniqueId);
            if (user == null) return NotFound("Profile was not found.");

            user.Name = newName;
            await _context.SaveChangesAsync();

            return Ok("Username updated.");
        }

        // Смена пароля пользователя
        [HttpPut("update-password/{uniqueId}")]
        public async Task<IActionResult> UpdateUserPassword(string uniqueId, [FromBody] string newPassword)
        {
            var user = await _context.users.FirstOrDefaultAsync(u => u.UniqueId == uniqueId);
            if (user == null) return NotFound("Profile was not found.");

            user.Password = HashPassword(newPassword);
            await _context.SaveChangesAsync();

            return Ok("Password update.");
        }

        // Хеширование пароля (SHA256)
        private string HashPassword(string password)
        {
            if (string.IsNullOrWhiteSpace(password))
            {
                throw new ArgumentException("Password cannot be empty.", nameof(password));
            }
        
            using var sha256 = SHA256.Create();
            var bytes = sha256.ComputeHash(Encoding.UTF8.GetBytes(password));
            return Convert.ToBase64String(bytes);
        }

        // Генерация уникального 6-значного ID
        private string GenerateUniqueId()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            var random = new Random();
            string uniqueId;

            do
            {
                uniqueId = new string(Enumerable.Repeat(chars, 6)
                    .Select(s => s[random.Next(s.Length)]).ToArray());
            }
            while (_context.users.Any(u => u.UniqueId == uniqueId));

            return uniqueId;
        }
    }
}
