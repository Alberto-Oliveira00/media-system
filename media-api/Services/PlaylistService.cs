using AutoMapper;
using media_api.DTOs;
using media_api.Models;
using media_api.Repositories;
using Microsoft.AspNetCore.Http.HttpResults;

namespace media_api.Services;

public class PlaylistService : IPlaylistService
{
    private readonly IUnitOfWork _uof;
    private readonly IMapper _mapper;

    public PlaylistService(IMapper mapper, IUnitOfWork uof)
    {
        _mapper = mapper;
        _uof = uof;
    }
    public async Task<IEnumerable<PlaylistResponseDTO>> GetAllPlaylistAsync()
    {
        var playlists = await _uof.PlaylistRepository.GetAllAsync();
        return _mapper.Map<IEnumerable<PlaylistResponseDTO>>(playlists);
    }

    public async Task<PlaylistResponseDTO> GetPlaylistIsActiveAsync()
    {
        var playlistActive = await _uof.PlaylistRepository.GetPlaylistIsActiveAsync();

        if (playlistActive == null)
            return null;

        return _mapper.Map<PlaylistResponseDTO>(playlistActive);
    }

    public async Task<PlaylistResponseDTO> GetPlaylistByIdAsync(int id)
    {
        var playlist = await _uof.PlaylistRepository.GetByIdAsync(id);
        if (playlist == null)
        {
            throw new KeyNotFoundException("Playlist não encontrada.");
        }
        return _mapper.Map<PlaylistResponseDTO>(playlist);
    }

    public async Task<IEnumerable<MediaResponseDTO>> GetMediasByPlaylistIdAsync(int playlistId)
    {
        var medias = await _uof.PlaylistRepository.GetMediasByPlaylistIdAsync(playlistId);
        return _mapper.Map<IEnumerable<MediaResponseDTO>>(medias);
    }

    public async Task<PlaylistResponseDTO> CreatePlaylistAsync(PlaylistRequestDTO playlistDTO)
    {
        var playlist = _mapper.Map<Playlist>(playlistDTO);
        var createPlaylist = await _uof.PlaylistRepository.AddAsync(playlist);
        await _uof.CommitAsync();
        return _mapper.Map<PlaylistResponseDTO>(createPlaylist);
    }

    public async Task UpdatePlaylistAsync(int id, PlaylistRequestDTO playlistDto)
    {
        var playlistUpdate = await _uof.PlaylistRepository.GetByIdAsync(id);
        if (playlistUpdate is null)
        {
            throw new KeyNotFoundException("Playlist não encontrada.");
        }
        _mapper.Map(playlistDto, playlistUpdate);
        await _uof.PlaylistRepository.UpdateAsync(playlistUpdate);
        await _uof.CommitAsync();
    }
    public async Task DeletePlaylistAsync(int id)
    {
        var playlistToDelete = await _uof.PlaylistRepository.GetByIdAsync(id);
        if (playlistToDelete == null)
        {
            throw new KeyNotFoundException("Playlist não encontrada.");
        }
        await _uof.PlaylistRepository.DeleteAsync(id);
        await _uof.CommitAsync();
    }
    public async Task AddMediaToPlaylistAsync(int playlistId, int mediaId)
    {
        var playlist = await _uof.PlaylistRepository.GetByIdAsync(playlistId);
        if (playlist is null)
            throw new KeyNotFoundException("Playlist não encontrada");

        var media = await _uof.MediaRepository.GetByIdAsync(mediaId);
        if (media is null)
            throw new KeyNotFoundException("Mídia não encontrada");

        await _uof.PlaylistRepository.AddMediaToPlaylistAsync(playlistId, mediaId);
        await _uof.CommitAsync();
    }
    public async Task DeleteMediaFromPlaylistAsync(int playlistId, int mediaId)
    {
        var playlist = await _uof.PlaylistRepository.GetByIdAsync(playlistId);
        if (playlist is null)
            throw new KeyNotFoundException("Playlist não encontrada");

        var media = await _uof.MediaRepository.GetByIdAsync(mediaId);
        if (media is null)
            throw new KeyNotFoundException("Mídia não encontrada");

        await _uof.PlaylistRepository.DeleteMediaToPlaylistAsync(playlistId, mediaId);
        await _uof.CommitAsync();
    }

    public async Task ActivePlaylistAsync(int id)
    {
        var playlists = await _uof.PlaylistRepository.GetAllAsync();

        foreach (var playlist in playlists)
        {
            playlist.IsActiveForPlayer = playlist.Id == id;
        }

        await _uof.CommitAsync();
    }
}
