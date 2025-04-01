using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using UserManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Настройка сервисов
builder.Services.AddControllersWithViews();
builder.Services.AddRazorPages();

builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(connectionString)
           .EnableSensitiveDataLogging() // ОТКЛЮЧИТЬ ПОТОМ
           .LogTo(Console.WriteLine, LogLevel.Information)); 

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin()
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});


// Добавление поддержки сессий
builder.Services.AddDistributedMemoryCache(); // Для хранения сессий в памяти
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30); // Время ожидания сессии
    options.Cookie.HttpOnly = true; // Сделать куки доступными только через HTTP
    options.Cookie.IsEssential = true; 
});

// Добавляем контроллеры
builder.Services.AddControllers();

var app = builder.Build();

// Использование сессий
app.UseSession();

app.UseHttpsRedirection();
app.UseCors("AllowAll");
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapRazorPages();

app.MapGet("/", () => "API is working...");

app.Run("http://localhost:5023");
