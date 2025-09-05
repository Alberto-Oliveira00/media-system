using media_api.DTOs;
using media_api.Services;
using Microsoft.AspNetCore.Mvc;

namespace media_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PlaylistsController : ControllerBase
{
    IPlaylistService _service;

    public PlaylistsController(IPlaylistService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<PlaylistResponseDTO>>> GetAllAsync()
    {
        try
        {
            var playlists = await _service.GetAllPlaylistAsync();
            if (playlists is null)
                return NoContent();
            return Ok(playlists);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpGet("{id:int}", Name = "GetPlaylistById")]
    public async Task<ActionResult<PlaylistResponseDTO>> GetPlaylistById(int id)
    {
        try
        {
            var playlist = await _service.GetPlaylistByIdAsync(id);
            return Ok(playlist);
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao buscar a mídia.");
        }
    }

    [HttpPost]
    public async Task<ActionResult<PlaylistResponseDTO>> PostAsync(PlaylistRequestDTO playlistDto)
    {
        try
        {
            var createPlaylist = await _service.CreatePlaylistAsync(playlistDto);
            return CreatedAtRoute("GetPlaylistById", new { id = createPlaylist.Id }, createPlaylist);
        }
        catch (ArgumentException ex)
        {
            return BadRequest(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync(int id, [FromBody] PlaylistRequestDTO playlistDto)
    {
        try
        {
            await _service.UpdatePlaylistAsync(id, playlistDto);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        try
        {
            await _service.DeletePlaylistAsync(id);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpPost("{playlistId:int}/media{mediaId:int}")]
    public async Task<IActionResult> PostMediaToPlaylistAsync(int playlistId, int mediaId)
    {
        try
        {
            await _service.AddMediaToPlaylistAsync(playlistId, mediaId);
            return Ok();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }

    [HttpDelete("{playlistId:int}/media{mediaId:int}")]
    public async Task<IActionResult> DeleteMediaToPlaylist(int playlistId, int mediaId)
    {
        try
        {
            await _service.RemoveMediaFromPlaylistAsync(playlistId, mediaId);
            return NoContent();
        }
        catch (KeyNotFoundException ex)
        {
            return NotFound(ex.Message);
        }
        catch (Exception ex)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, ex.Message);
        }
    }
}