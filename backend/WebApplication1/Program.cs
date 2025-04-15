using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ProjectDBContext>(options => 
    options.UseSqlite(builder.Configuration.GetConnectionString("ProjectConnection")));

var AllowFrontend = "AllowFrontend";

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: AllowFrontend,
        policy =>
        {
            policy.WithOrigins("http://localhost:3000") // frontend origin
                .AllowAnyHeader()
                .AllowAnyMethod(); // <- this allows PUT, POST, DELETE, etc.
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowFrontend");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();