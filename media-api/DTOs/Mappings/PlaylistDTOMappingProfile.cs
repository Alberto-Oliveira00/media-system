using AutoMapper;
using media_api.Models;

namespace media_api.DTOs.Mappings;

public class PlaylistDTOMappingProfile : Profile
{
    public PlaylistDTOMappingProfile()
    {
        CreateMap<PlaylistRequestDTO, Playlist>();

        CreateMap<PlaylistResponseDTO, Playlist>();
    }
}