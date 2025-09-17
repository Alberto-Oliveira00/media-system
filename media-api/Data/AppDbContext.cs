using media_api.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace media_api.Data;

public class AppDbContext : IdentityDbContext<ApplicationUser>
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Media> Medias { get; set; }
    public DbSet<Playlist> Playlists { get; set; }
    public DbSet<PlaylistMedia> PlaylistMedias { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<PlaylistMedia>()
        .HasKey(pm => new { pm.PlaylistId, pm.MediaId });

        modelBuilder.Entity<PlaylistMedia>()
            .HasOne(pm => pm.Playlist)
            .WithMany(p => p.PlaylistMedias)
            .HasForeignKey(pm => pm.PlaylistId);

        modelBuilder.Entity<PlaylistMedia>()
            .HasOne(pm => pm.Media)
            .WithMany(m => m.PlaylistMedias)
            .HasForeignKey(pm => pm.MediaId);
    }
}
