using media_api.Data;
using media_api.Models;
using Microsoft.EntityFrameworkCore;

namespace media_api.Repositories;

public class MediaRepository : IMediaRepository
{
    private readonly AppDbContext _context;

    public MediaRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task AddAsync(Media media)
    {
        await _context.Medias.AddAsync(media);
    }

    
    public async Task<IEnumerable<Media>> GetAllAsync()
    {
        var medias = await _context.Medias.AsNoTracking().ToListAsync();

        return medias;
    }

    public async Task<Media> GetByIdAsync(int id)
    { 
        return await _context.Medias.FindAsync(id);
    }

    public Task UpdateAsync(Media media)
    {
        _context.Entry(media).State = EntityState.Modified;
        return Task.CompletedTask;
    }

    public async Task DeleteAsync(int id)
    {
        var media = await _context.Medias.FindAsync(id);
        if (media != null)
        {
            _context.Medias.Remove(media);
        }
    }

    public async Task CommitAsync()
    {
        await _context.SaveChangesAsync();
    }
}
