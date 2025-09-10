using media_api.DTOs;
using media_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace media_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlaylistController : ControllerBase
{
    IPlaylistService _service;

    public PlaylistController(IPlaylistService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlaylistResponseDTO>>> GetAllAsync()
    {
        var playlists = await _service.GetAllPlaylistAsync();
        return Ok(playlists);
    }

    [HttpGet("{id:int}", Name = "GetPlaylistById")]
    public async Task<ActionResult<PlaylistResponseDTO>> GetPlaylistById(int id)
    {
        var playlist = await _service.GetPlaylistByIdAsync(id);
        return Ok(playlist);
    }

    [HttpGet("{id:int}/medias")]
    public async Task<ActionResult<IEnumerable<MediaResponseDTO>>> GetMediasByPlaylistIdAsync(int id)
    {
        var medias = await _service.GetMediasByPlaylistIdAsync(id);
        return Ok(medias);
    }

    [HttpPost]
    public async Task<ActionResult<PlaylistResponseDTO>> PostAsync(PlaylistRequestDTO playlistDto)
    {
        var createPlaylist = await _service.CreatePlaylistAsync(playlistDto);
        return CreatedAtRoute("GetPlaylistById", new { id = createPlaylist.Id },createPlaylist);
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync(int id, [FromBody] PlaylistRequestDTO playlistDto)
    {
        await _service.UpdatePlaylistAsync(id, playlistDto);
        return NoContent();
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        await _service.DeletePlaylistAsync(id);

        return NoContent();
    }

    [HttpGet("active")]
    public async Task<ActionResult<PlaylistResponseDTO>> GetActivePlaylistsAsync()
    {
        var activePlaylist = await _service.GetPlaylistIsActiveAsync();            
        return Ok(activePlaylist);
    }

    [HttpPut("{id:int}/active")]
    public async Task<IActionResult> ActivePlaylistAsync(int id)
    {
        await _service.ActivePlaylistAsync(id);
        return NoContent();        
    }

    [HttpPost("{playlistId:int}/medias/{mediaId:int}")]
    public async Task<IActionResult> PostMediaToPlaylistAsync(int playlistId, int mediaId)
    {
        await _service.AddMediaToPlaylistAsync(playlistId, mediaId);
        return Ok();
    }

    [HttpDelete("{playlistId:int}/media/{mediaId:int}")]
    public async Task<IActionResult> DeleteMediaToPlaylist(int playlistId, int mediaId)
    {
        await _service.DeleteMediaFromPlaylistAsync(playlistId, mediaId);
        return NoContent();
    }
}