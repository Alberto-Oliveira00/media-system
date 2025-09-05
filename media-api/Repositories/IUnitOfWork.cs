namespace media_api.Repositories;

public interface IUnitOfWork
{
    IMediaRepository MediaRepository { get; }
    IPlaylistRepository PlaylistRepository { get; }

    Task CommitAsync();
}