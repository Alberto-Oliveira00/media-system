using System.ComponentModel.DataAnnotations;
using media_api.Models;

namespace media_api.DTOs;

public class PlaylistRequestDTO
{
    [Required]
    [StringLength(255, ErrorMessage = "O nome não pode ter mais de 255 caracteres.")]
    public string Nome { get; set; } = string.Empty;
    public string? Descricao { get; set; }
    public bool IsActiveForPlayer { get; set; } = false;

    public ICollection<PlaylistMedia> PlaylistMedias { get; set; } = new List<PlaylistMedia>();
}