using media_api.Models;

namespace media_api.Repositories;

public interface IPlaylistRepository
{
    Task<IEnumerable<Playlist>> GetAllAsync();
    Task<Playlist> GetByIdAsync(int id);
    Task<Playlist> AddAsync(Playlist playlist);
    Task<IEnumerable<Media>> GetMediasByPlaylistIdAsync(int playlistId);
    Task UpdateAsync(Playlist playlist);
    Task DeleteAsync(int id);
    Task AddMediaToPlaylistAsync(int playlistId, int mediaId);
    Task DeleteMediaToPlaylistAsync(int playlistId, int mediaId);
    Task<Playlist> GetPlaylistIsActiveAsync();
}