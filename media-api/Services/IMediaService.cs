using media_api.DTOs;

namespace media_api.Services;

public interface IMediaService
{
    Task<MediaResponseDTO> CreateMediaAsync(MediaRequestDTO mediaDto);
    Task<IEnumerable<MediaResponseDTO>> GetAllMediasAsync();
    Task<MediaResponseDTO> GetMediaByIdAsync(int id);
    Task UpdateMediaAsync(int id, MediaRequestDTO mediaDto);
    Task DeleteMediaAsync(int id);
}