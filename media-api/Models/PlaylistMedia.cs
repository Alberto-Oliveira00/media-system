namespace media_api.Models;

public class PlaylistMedia
{
    public int PlaylistId { get; set; }
    public Playlist Playlist { get; set; }

    public int MediaId { get; set; }
    public Media Media { get; set; }
}
