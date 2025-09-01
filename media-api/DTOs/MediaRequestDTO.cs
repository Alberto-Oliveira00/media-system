using System.ComponentModel.DataAnnotations;

namespace media_api.DTOs;

public class MediaRequestDTO
{
    [Required(ErrorMessage = "O nome da mídia é obrigatório.")]
    public string Nome { get; set; } = string.Empty;
    public string? Descricao { get; set; }

    [Required(ErrorMessage = "O caminho do arquivo é obrigatório.")]
    public string FilePath { get; set; } = string.Empty;
}
