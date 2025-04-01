using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy => policy.WithOrigins("http://localhost:3000")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});
builder.Services.AddControllers();
builder.Services.AddLogging(); // Добавляем логирование

var app = builder.Build();

app.UseHttpsRedirection();  // Принудительно делает HTTPS (можно убрать для локальной разработки)
app.UseCors("AllowFrontend"); // Включает CORS
app.MapControllers();  // Включает API-контроллеры

app.MapGet("/", async (AppDbContext db) =>
{
    var users = await db.Users.ToListAsync();
    return Results.Json(new { message = "API is working...", users });
});

app.Run();
