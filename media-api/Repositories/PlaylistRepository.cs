using media_api.Data;
using media_api.Models;
using Microsoft.EntityFrameworkCore;

namespace media_api.Repositories;

public class PlaylistRepository : IPlaylistRepository
{
    private readonly AppDbContext _context;

    public PlaylistRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<Playlist>> GetAllAsync()
    {
        return await _context.Playlists.Include(p => p.PlaylistMedias).ThenInclude(pm => pm.Media).ToListAsync();
    }

    public async Task<Playlist> GetByIdAsync(int id)
    {
        return await _context.Playlists
        .Include(p => p.PlaylistMedias)
        .ThenInclude(pm => pm.Media)
        .FirstOrDefaultAsync(p => p.Id == id);
    }

    public async Task<IEnumerable<Media>> GetMediasByPlaylistIdAsync(int playlistId)
    {
        var medias = await _context.PlaylistMedias
                    .Where(p => p.PlaylistId == playlistId)
                    .Select(pm => pm.Media)
                    .ToListAsync();
        return medias;
    }

    public async Task<Playlist> AddAsync(Playlist playlist)
    {
        await _context.Playlists.AddAsync(playlist);
        return playlist;
    }

    public async Task UpdateAsync(Playlist playlist)
    {
        _context.Playlists.Update(playlist);
    }

    public async Task DeleteAsync(int id)
    {
        var playlist = await _context.Playlists.FindAsync(id);
        if (playlist != null)
        {
            _context.Playlists.Remove(playlist);
        }
    }

    public async Task AddMediaToPlaylistAsync(int playlistId, int mediaId)
    {
        var playlistMedia = new PlaylistMedia
        {
            PlaylistId = playlistId,
            MediaId = mediaId
        };
        await _context.PlaylistMedias.AddAsync(playlistMedia);
    }

    public async Task DeleteMediaToPlaylistAsync(int playlistId, int mediaId)
    {
        var playlistMedia = await _context.PlaylistMedias
            .FirstOrDefaultAsync(pm => pm.PlaylistId == playlistId && pm.MediaId == mediaId);
        if (playlistMedia != null)
        {
            _context.PlaylistMedias.Remove(playlistMedia);
        }
    }
}