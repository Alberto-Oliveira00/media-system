using System.ComponentModel.DataAnnotations;

namespace media_api.Models;

public class Playlist
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(255)]
    public string Nome { get; set; } = string.Empty;

    public bool IsActiveForPlayer { get; set; } = false;

    public ICollection<PlaylistMedia> PlaylistMedias { get; set; } = new List<PlaylistMedia>();
}
