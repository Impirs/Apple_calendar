using System.ComponentModel.DataAnnotations.Schema;

namespace UserManagementAPI.Models
{
    [Table("users")]
    public class User
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Password { get; set; }

    }
}
