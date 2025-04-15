using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

namespace WebApplication1.Controllers;
[ApiController]
[Route("api/[controller]")]
public class ProjectController : ControllerBase
{
    private readonly ProjectDBContext _context;

    public ProjectController(ProjectDBContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IActionResult GetProjects()
    {
        var projects = _context.Projects.ToList(); // ← this should work if EF is properly set up
        return Ok(projects);
    }
    
    [HttpPut("{id}")]
    public async Task<IActionResult> UpdateProject(int id, [FromBody] Project updatedProject)
    {
        if (id != updatedProject.ProjectId)
            return BadRequest();

        _context.Entry(updatedProject).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }
    
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProject(int id)
    {
        var project = await _context.Projects.FindAsync(id);
        if (project == null)
            return NotFound();

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return NoContent();
    }


}
