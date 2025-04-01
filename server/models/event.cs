using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UserManagementAPI.Models;
using GroupManagementAPI.Models;
using RecurRulesAPI.Models;

namespace EventManagementAPI.Models {
    [Table("events")]
    public class Event
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("title")]
        public string? Title { get; set; }

        [Column("description")]
        public string? Description { get; set; }

        [Column("start_time")]
        public DateTime StartTime { get; set; }

        [Column("end_time")]
        public DateTime EndTime { get; set; }

        [Column("user_id")]
        public int UserId { get; set; }

        [ForeignKey("UserId")]
        public User? User { get; set; }

        [Column("group_id")]
        public int? GroupId { get; set; }

        [ForeignKey("GroupId")]
        public EventGroup? Group { get; set; }

        [Column("recurrence_id")]
        public int? RecurrenceId { get; set; }

        [ForeignKey("RecurrenceId")]
        public RecurrenceRule? Recurrence { get; set; }
    }

}