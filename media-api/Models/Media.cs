using System.ComponentModel.DataAnnotations;

namespace media_api.Models;

public class Media
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Nome { get; set; } = string.Empty;

    [StringLength(1000)]
    public string Descricao { get; set; } = string.Empty;

    [Required]
    public string FilePath { get; set; } = string.Empty;

    public ICollection<PlaylistMedia> PlaylistMedias { get; set; } = new List<PlaylistMedia>();
}
