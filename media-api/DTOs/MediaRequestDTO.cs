using System.ComponentModel.DataAnnotations;

namespace media_api.DTOs;

public class MediaRequestDTO
{
    [Required(ErrorMessage = "O nome da mídia é obrigatório.")]
    public string Nome { get; set; } = string.Empty;

    [Required(ErrorMessage = "A descrição da mídia é obrigatória.")]
    public string? Descricao { get; set; }

    public IFormFile File { get; set; }
}
