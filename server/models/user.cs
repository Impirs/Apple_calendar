using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using EventManagementAPI.Models;

namespace UserManagementAPI.Models
{
    [Table("users")]
    public class User
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("unique_id")]
        public string? UniqueId { get; set; } = GenerateUniqueId();

        [Column("name")]
        public string? Name { get; set; }

        [Column("password")]
        public string? Password { get; set; }

        public ICollection<Event> Events { get; set; } = new List<Event>();

        private static string GenerateUniqueId()
        {
            Random random = new();
            return random.Next(100000, 999999).ToString();
        }
    }

}
