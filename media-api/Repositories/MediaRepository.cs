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

    public async Task UpdateAsync(Media media)
    {
        _context.Medias.Update(media);
    }

    public async Task DeleteAsync(int id)
    {
        var media = await _context.Medias.FindAsync(id);
        if (media != null)
        {
            _context.Medias.Remove(media);
        }
    }
}
