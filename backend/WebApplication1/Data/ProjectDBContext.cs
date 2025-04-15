using Microsoft.EntityFrameworkCore;

namespace WebApplication1.Data;

public class ProjectDBContext : DbContext
{
    public ProjectDBContext(DbContextOptions<ProjectDBContext> options) : base(options)
    {
        var conn = Database.GetDbConnection();
        Console.WriteLine("🔎 EF Core is using connection string: " + conn.ConnectionString);
        Console.WriteLine("📦 EF Core is using provider: " + conn.GetType().FullName);
    }

    
    public DbSet<Project> Projects { get; set; }
}