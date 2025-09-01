using media_api.Models;

namespace media_api.Repositories;

public interface IMediaRepository
{
    Task<IEnumerable<Media>> GetAllAsync();

    Task<Media> GetByIdAsync(int id);
    Task AddAsync(Media media);
    Task UpdateAsync(Media media);
    Task DeleteAsync(int id);
    Task CommitAsync();
}
