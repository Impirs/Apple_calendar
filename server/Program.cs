using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Session;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using UserManagementAPI.Data;

var builder = WebApplication.CreateBuilder(args);

var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

// Настройка сервисов
builder.Services.AddRazorPages();
builder.Services.AddControllersWithViews();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "User Management API", Version = "v1" });
});

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

if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI(c => 
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "User Management API v1");
    });
}

// Использование сессий
app.UseSession();

app.UseHttpsRedirection();
app.UseAuthorization();
app.UseCors("AllowAll");
app.UseStaticFiles();
app.UseRouting();

app.MapControllers();
app.MapRazorPages();

app.MapGet("/", () => "API is working...");

app.Run("http://localhost:5023");
