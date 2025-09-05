using AutoMapper;
using media_api.DTOs;
using media_api.Models;
using media_api.Repositories;

namespace media_api.Services;

public class MediaService : IMediaService
{
    private readonly IMapper _mapper;
    private readonly IWebHostEnvironment _env;
    private readonly IUnitOfWork _uof;

    public MediaService(IMapper mapper, IWebHostEnvironment env, IUnitOfWork uof)
    {
        _mapper = mapper;
        _env = env;
        _uof = uof;
    }
    public async Task<MediaResponseDTO> CreateMediaAsync(MediaRequestDTO mediaDto)
    {
        var uploadsPath = Path.Combine(_env.WebRootPath, "uploads");
        if (!Directory.Exists(uploadsPath))
            Directory.CreateDirectory(uploadsPath);

        var fileName = DateTime.Now.ToString("ddMMyyyyhhss") + "_" + mediaDto.Nome + Path.GetExtension(mediaDto.File.FileName);
        var filePath = Path.Combine(uploadsPath, fileName);

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await mediaDto.File.CopyToAsync(stream);
        }

        var media = _mapper.Map<Media>(mediaDto);
        media.FilePath = $"/uploads/{fileName}";

        await _uof.MediaRepository.AddAsync(media);
        await _uof.CommitAsync();

        return _mapper.Map<MediaResponseDTO>(media);
    }

    public async Task<IEnumerable<MediaResponseDTO>> GetAllMediasAsync()
    {
        var medias = await _uof.MediaRepository.GetAllAsync();

        return _mapper.Map<IEnumerable<MediaResponseDTO>>(medias);
    }

    public async Task<MediaResponseDTO> GetMediaByIdAsync(int id)
    {
        var media = await _uof.MediaRepository.GetByIdAsync(id);
        if (media is null)
            throw new KeyNotFoundException("Mídia não encontrada.");

        return _mapper.Map<MediaResponseDTO>(media);
    }

    public async Task<MediaResponseDTO> UpdateMediaAsync(int id, MediaRequestDTO mediaDto)
    {
        var media = await _uof.MediaRepository.GetByIdAsync(id);

        if (media is null)
            throw new KeyNotFoundException("Mídia não encontrada.");

        _mapper.Map(mediaDto, media);

        if(mediaDto.File != null && mediaDto.File.Length > 0)
        {
            var antigoFile = Path.Combine(_env.WebRootPath, media.FilePath.TrimStart('/'));
            if (File.Exists(antigoFile))
                File.Delete(antigoFile);

            var uploadPath = Path.Combine(_env.WebRootPath, "uploads");
            if (!Directory.Exists(uploadPath))
                Directory.CreateDirectory(uploadPath);

            var fileName = DateTime.Now.ToString("ddMMyyyyhhss") + "_" + mediaDto.Nome + Path.GetExtension(mediaDto.File.FileName);
            var newFilePath = Path.Combine(uploadPath, fileName);

            using(var stream = new FileStream(newFilePath, FileMode.Create))
            {
                await mediaDto.File.CopyToAsync(stream);
            }

            media.FilePath = $"/uploads/{fileName}";
        }

        await _uof.MediaRepository.UpdateAsync(media);

        await _uof.CommitAsync();
        return _mapper.Map<MediaResponseDTO>(media);
    }

    public async Task DeleteMediaAsync(int id)
    {
        var mediaDelete = await _uof.MediaRepository.GetByIdAsync(id);

        if (mediaDelete is null)
            throw new KeyNotFoundException("Id não encontrado");

        await _uof.MediaRepository.DeleteAsync(id);
        await _uof.CommitAsync();
    }
}