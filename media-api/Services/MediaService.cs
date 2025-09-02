using AutoMapper;
using media_api.DTOs;
using media_api.Models;
using media_api.Repositories;

namespace media_api.Services;

public class MediaService : IMediaService
{
    private readonly IMediaRepository _repository;
    private readonly IMapper _mapper;

    public MediaService(IMapper mapper, IMediaRepository repository)
    {
        _mapper = mapper;
        _repository = repository;
    }
    public async Task<MediaResponseDTO> CreateMediaAsync(MediaRequestDTO mediaDto)
    {
        if (string.IsNullOrWhiteSpace(mediaDto.Nome))
            throw new ArgumentException("O nome da mídia é obrigatório.");

        if (string.IsNullOrWhiteSpace(mediaDto.FilePath))
            throw new ArgumentException("A mídia é obrigatório.");

        var media = _mapper.Map<Media>(mediaDto);

        await _repository.AddAsync(media);
        await _repository.CommitAsync();

        return _mapper.Map<MediaResponseDTO>(media);
    }

    public async Task<IEnumerable<MediaResponseDTO>> GetAllMediasAsync()
    {
        var medias = await _repository.GetAllAsync();

        return _mapper.Map<IEnumerable<MediaResponseDTO>>(medias);
    }

    public async Task<MediaResponseDTO> GetMediaByIdAsync(int id)
    {
        var media = await _repository.GetByIdAsync(id);
        if (media is null)
            throw new KeyNotFoundException("Mídia não encontrada.");

        return _mapper.Map<MediaResponseDTO>(media);
    }

    public async Task UpdateMediaAsync(int id, MediaRequestDTO mediaDto)
    {
        if (id <= 0)
            throw new ArgumentException("Id da mídia inválida.");

        var media = await _repository.GetByIdAsync(id);

        if (media is null)
            throw new KeyNotFoundException("Id não encontrado");

        _mapper.Map(mediaDto, media);

        await _repository.UpdateAsync(media);

        await _repository.CommitAsync();
    }

    public async Task DeleteMediaAsync(int id)
    {
        var mediaDelete = await _repository.GetByIdAsync(id);

        if (mediaDelete is null)
            throw new KeyNotFoundException("Id não encontrado");

        await _repository.DeleteAsync(id);
        await _repository.CommitAsync();
    }
}