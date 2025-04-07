using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Collections.Generic; // For List<T>
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

        // Owner
        [Column("user_id")]
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User? User { get; set; }

        // Title
        [Column("title")]
        public string? Title { get; set; }

        // Location or Video Call
        [Column("description")]
        public string? Description { get; set; }

        //Calendar
        [Column("group_id")]
        public int? GroupId { get; set; }
        [ForeignKey("GroupId")]
        public EventGroup? Group { get; set; }

        // All Day
        [Column("allday")]
        public bool Allday { get; set; }

        // Starts
        [Column("start_time")]
        public DateTime StartTime { get; set; }

        // Ends
        [Column("end_time")]
        public DateTime EndTime { get; set; }

        // Repeat
        [Column("recurrence_id")]
        public int? RecurrenceId { get; set; }
        [ForeignKey("RecurrenceId")]
        public RecurrenceRule? Recurrence { get; set; }

        // Alert
        [Column("alert")]
        public bool Alert { get; set; }

        // Invitees
        [Column("invitees")]
        public List<User>? Invitees { get; set; }

        // URL
        [Column("url")]
        public string? Url { get; set; }

        // Notes
        [Column("notes")]
        public string? Notes { get; set; }
    }

}