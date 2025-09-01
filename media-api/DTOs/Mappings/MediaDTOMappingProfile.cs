using AutoMapper;
using media_api.Models;

namespace media_api.DTOs.Mappings;

public class MediaDTOMappingProfile : Profile
{
    public MediaDTOMappingProfile()
    {
        CreateMap<MediaRequestDTO, Media>().ReverseMap();
        CreateMap<Media, MediaResponseDTO>().ReverseMap();
    }
}
