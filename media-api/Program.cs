using media_api.Data;
using media_api.DTOs.Mappings;
using media_api.Repositories;
using media_api.Services;
using Microsoft.EntityFrameworkCore;
using System;

var builder = WebApplication.CreateBuilder(args);


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<AppDbContext>(options =>
   options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"))
);

builder.Services.AddScoped<IMediaService, MediaService>();
builder.Services.AddScoped<IMediaRepository, MediaRepository>();


builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile(new MediaDTOMappingProfile());
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();
