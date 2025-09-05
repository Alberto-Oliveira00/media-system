using media_api.Data;
using media_api.Repositories;

namespace media_api.Repositories;

public class UnitOfWork : IUnitOfWork
{
    private readonly AppDbContext _context;
    private IMediaRepository _mediaRepository;
    private IPlaylistRepository _playlistRepository;

    public UnitOfWork(AppDbContext context)
    {
        _context = context;
    }
    public IMediaRepository MediaRepository
    {
        get
        {
            return _mediaRepository = _mediaRepository ?? new MediaRepository(_context);
        }
    }

    public IPlaylistRepository PlaylistRepository
    {
        get
        {
            return _playlistRepository = _playlistRepository ?? new PlaylistRepository(_context);
        }
    }

    public async Task CommitAsync()
    {
        await _context.SaveChangesAsync();
    }
}