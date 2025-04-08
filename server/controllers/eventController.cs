using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Data;
using EventManagementAPI.Models;
using RecurRulesAPI.Models;


namespace EventManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventsController(AppDbContext context)
        {
            _context = context;
        }

        [HttpPost("create-event")]
        public async Task<IActionResult> CreateEvent([FromBody] Event newEvent)
        {
            if (newEvent == null) return BadRequest("Некорректные данные события");

            await _context.events.AddAsync(newEvent);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Событие создано", eventId = newEvent.Id });
        }

        [HttpGet("get-events-by-date")]
        public async Task<IActionResult> GetEventsByDate([FromQuery] DateTime date)
        {
            var events = await _context.events
                .Where(e => e.StartTime.Date == date.Date)
                .ToListAsync();

            if (!events.Any()) return NotFound("События на указанную дату не найдены");

            return Ok(events);
        }

        [HttpGet("get-events-by-owner/{ownerId}")]
        public async Task<IActionResult> GetEventsByOwner(int ownerId)
        {
            var events = await _context.events
                .Where(e => e.UserId == ownerId)
                .ToListAsync();

            if (!events.Any()) return NotFound("События для указанного владельца не найдены");

            return Ok(events);
        }

        [HttpGet("get-events-by-group/{groupId}")]
        public async Task<IActionResult> GetEventsByGroup(int groupId)
        {
            var events = await _context.events
                .Where(e => e.GroupId == groupId)
                .ToListAsync();

            if (!events.Any()) return NotFound("События для указанной группы не найдены");

            return Ok(events);
        }

        [HttpPut("update-event/{eventId}")]
        public async Task<IActionResult> UpdateEvent(int eventId, [FromBody] Event updatedEvent)
        {
            var existingEvent = await _context.events.FindAsync(eventId);
            if (existingEvent == null) return NotFound("Событие не найдено");

            existingEvent.Title = updatedEvent.Title;
            existingEvent.StartTime = updatedEvent.StartTime;
            existingEvent.EndTime = updatedEvent.EndTime;
            existingEvent.GroupId = updatedEvent.GroupId;
            existingEvent.UserId = updatedEvent.UserId;

            await _context.SaveChangesAsync();

            return Ok("Событие обновлено");
        }

        [HttpPut("update-recurrence/{eventId}")]
        public async Task<IActionResult> UpdateRecurrence(int eventId, [FromBody] RecurrenceRule newRecurrence)
        {
            var eventToUpdate = await _context.events.FindAsync(eventId);
            if (eventToUpdate == null) return NotFound("Событие не найдено");

            var recurrence = await _context.recurrence_rules.FindAsync(eventToUpdate.RecurrenceId);
            if (recurrence == null) return NotFound("Правило повторения не найдено");

            recurrence.Frequency = newRecurrence.Frequency;
            recurrence.Interval = newRecurrence.Interval;
            recurrence.Until = newRecurrence.Until;

            await _context.SaveChangesAsync();

            return Ok("Периодичность обновлена");
        }

        [HttpDelete("delete/{eventId}")]
        public async Task<IActionResult> DeleteEvent(int eventId)
        {
            var eventToDelete = await _context.events.FindAsync(eventId);
            if (eventToDelete == null) return NotFound("Событие не найдено.");

            _context.events.Remove(eventToDelete);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Событие удалено", eventId });
        }
    }
}
