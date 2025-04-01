using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using UserManagementAPI.Data;
using GroupManagementAPI.Models;

namespace EventManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class EventGroupsController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EventGroupsController(AppDbContext context)
        {
            _context = context;
        }

        // Создать новую группу событий
        [HttpPost("create")]
        public async Task<IActionResult> CreateGroup([FromBody] EventGroup group)
        {
            if (group == null || string.IsNullOrEmpty(group.Name))
            {
                return BadRequest("Название группы обязательно.");
            }

            _context.event_groups.Add(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Группа событий создана", group });
        }

        // Получить все группы событий
        [HttpGet]
        public async Task<ActionResult<IEnumerable<EventGroup>>> GetGroups()
        {
            return await _context.event_groups.Include(g => g.Events).ToListAsync();
        }

        // Получить группу по ID
        [HttpGet("{groupId}")]
        public async Task<ActionResult<EventGroup>> GetGroup(int groupId)
        {
            var group = await _context.event_groups.Include(g => g.Events)
                                                  .FirstOrDefaultAsync(g => g.Id == groupId);

            if (group == null)
                return NotFound("Группа не найдена.");

            return group;
        }

        // Обновить название группы
        [HttpPut("update/{groupId}")]
        public async Task<IActionResult> UpdateGroup(int groupId, [FromBody] EventGroup updatedGroup)
        {
            var group = await _context.event_groups.FindAsync(groupId);
            if (group == null) return NotFound("Группа не найдена.");

            group.Name = updatedGroup.Name;
            group.Color = updatedGroup.Color;

            await _context.SaveChangesAsync();
            return Ok(new { message = "Группа обновлена", group });
        }

        // Удалить группу событий
        [HttpDelete("delete/{groupId}")]
        public async Task<IActionResult> DeleteGroup(int groupId)
        {
            var group = await _context.event_groups.FindAsync(groupId);
            if (group == null) return NotFound("Группа не найдена.");

            _context.event_groups.Remove(group);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Группа удалена" });
        }

        // Добавить событие в группу
        [HttpPost("{groupId}/add-event/{eventId}")]
        public async Task<IActionResult> AddEventToGroup(int groupId, int eventId)
        {
            var group = await _context.event_groups.Include(g => g.Events)
                                                  .FirstOrDefaultAsync(g => g.Id == groupId);
            var eventItem = await _context.events.FindAsync(eventId);

            if (group == null || eventItem == null)
                return NotFound("Группа или событие не найдены.");

            group.Events.Add(eventItem);
            await _context.SaveChangesAsync();

            return Ok(new { message = "Событие добавлено в группу" });
        }
    }
}
