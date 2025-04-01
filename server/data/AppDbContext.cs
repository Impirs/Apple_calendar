using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Models;

namespace UserManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {
        }

        public DbSet<User> Users { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users"); 
                entity.Property(e => e.Id).HasColumnName("id"); 
                entity.Property(e => e.Name).HasColumnName("name"); 
                entity.Property(e => e.Password).HasColumnName("password");
            });
        }

    }
}
