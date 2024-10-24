using AuctionService.Data;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AuctionDbContext>( opt => 
{
    opt.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddScoped<IAuctionRepository, AuctionRepository>();

var app = builder.Build();

app.UseAuthorization();

app.MapControllers();

// Initialize the database with seed data
var logger = app.Services.GetRequiredService<ILogger<Program>>();
try
{
    DbInitializer.InitDb(app);
}
catch (Exception e)
{
    logger.LogError(e, "An error occurred during database initialization.");
}

app.Run();
