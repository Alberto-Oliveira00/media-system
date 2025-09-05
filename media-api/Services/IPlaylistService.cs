using media_api.DTOs;

namespace media_api.Services;

public interface IPlaylistService
{
    Task<PlaylistResponseDTO> CreatePlaylistAsync(PlaylistRequestDTO playlistDTO);
    Task<IEnumerable<PlaylistResponseDTO>> GetAllPlaylistAsync();
    Task<PlaylistResponseDTO> GetPlaylistByIdAsync(int id);
    Task UpdatePlaylistAsync(int id, PlaylistRequestDTO playlistDto);
    Task DeletePlaylistAsync(int id);
    Task AddMediaToPlaylistAsync(int playlistId, int mediaId);
    Task RemoveMediaFromPlaylistAsync(int playlistId, int mediaId);
}