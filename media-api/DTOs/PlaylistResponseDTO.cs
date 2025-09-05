using media_api.Models;

namespace media_api.DTOs;

public class PlaylistResponseDTO
{
    public int Id { get; set; }
    public string Nome { get; set; } = string.Empty;
    public string Descricao { get; set; } = string.Empty;
    public bool IsActiveForPlayer { get; set; }
    public DateTime Date { get; set; }
    public ICollection<Media> Medias { get; set; } = new List<Media>();
}