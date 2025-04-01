using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UserManagementAPI.Models;
using EventManagementAPI.Models;

namespace GroupManagementAPI.Models
{
    [Table("event_groups")]
    public class EventGroup
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }
    
        [Column("name")]
        public string? Name { get; set; }
    
        [Column("color")]
        public string Color { get; set; } = "#FFFFFF"; // Белый по умолчанию
    
        [Column("user_id")]
        public int UserId { get; set; }
    
        [ForeignKey("UserId")]
        public User? User { get; set; }
    
        public ICollection<Event> Events { get; set; } = new List<Event>();
    }

}
