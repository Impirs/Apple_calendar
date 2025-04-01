using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Models;
using EventManagementAPI.Models;
using RecurRulesAPI.Models;
using GroupManagementAPI.Models;

namespace UserManagementAPI.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<User> users { get; set; }
        public DbSet<Event> events { get; set; }
        public DbSet<RecurrenceRule> recurrence_rules { get; set; }
        public DbSet<EventGroup> event_groups { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>(entity =>
            {
                entity.ToTable("users");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Password).HasColumnName("password");
                entity.Property(e => e.UniqueId).HasColumnName("unique_id").HasMaxLength(6).IsRequired();
            });

            modelBuilder.Entity<Event>(entity =>
            {
                entity.ToTable("events");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Title).HasColumnName("title");
                entity.Property(e => e.StartTime).HasColumnName("start_time");
                entity.Property(e => e.EndTime).HasColumnName("end_time");
                entity.Property(e => e.RecurrenceId).HasColumnName("recurrence_id");
                entity.Property(e => e.GroupId).HasColumnName("group_id");
            });

            modelBuilder.Entity<RecurrenceRule>(entity =>
            {
                entity.ToTable("recurrence_rules");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Frequency).HasColumnName("frequency");
                entity.Property(e => e.Interval).HasColumnName("interval");
                entity.Property(e => e.Until).HasColumnName("until");
            });

            modelBuilder.Entity<EventGroup>(entity =>
            {
                entity.ToTable("event_groups");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).HasColumnName("id");
                entity.Property(e => e.Name).HasColumnName("name");
                entity.Property(e => e.Color).HasColumnName("color");
                entity.Property(e => e.UserId).HasColumnName("user_id");
            });
        }
    }
}
