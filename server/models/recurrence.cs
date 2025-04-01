using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using UserManagementAPI.Models;
using EventManagementAPI.Models;

namespace RecurRulesAPI.Models 
{
    [Table("recurrence_rules")]
    public class RecurrenceRule
    {
        [Key]
        [Column("id")]
        public int Id { get; set; }

        [Column("frequency")]
        public string? Frequency { get; set; } // DAILY, WEEKLY, MONTHLY

        [Column("interval")]
        public int Interval { get; set; } // 1 - каждый день, 2 - через день и т.д.

        [Column("until")]
        public DateTime? Until { get; set; } // Дата окончания повторений

        public ICollection<Event> Events { get; set; } = new List<Event>();
    }
}