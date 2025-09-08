using AutoMapper;
using media_api.Models;

namespace media_api.DTOs.Mappings;

public class PlaylistDTOMappingProfile : Profile
{
    public PlaylistDTOMappingProfile()
    {
        CreateMap<PlaylistRequestDTO, Playlist>();

        CreateMap<Playlist, PlaylistResponseDTO>()
            .ForMember(dest => dest.Medias, opt => opt.MapFrom(src => src.PlaylistMedias.Select(pm => pm.Media)));
    }
}