using media_api.DTOs;
using media_api.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace media_api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class MediaController : ControllerBase
{
    private readonly IMediaService _service;
    
    public MediaController(IMediaService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<MediaResponseDTO>>> GetAsync()
    {
        try
        {
            var medias = await _service.GetAllMediasAsync();

            if (medias == null)
                return NoContent();

            return Ok(medias);
        }
        catch (Exception)
        {
            return StatusCode(StatusCodes.Status500InternalServerError, "Ocorreu um erro ao buscar a mídia.");
        }
        
    }

    [HttpGet("{id:int}", Name = "GetMediaById")]
    public async Task<ActionResult<MediaResponseDTO>> GetByIdAsync(int id)
    {
        try
        {
            var media = await _service.GetMediaByIdAsync(id);
            return Ok(media);
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
    public async Task<ActionResult<MediaResponseDTO>> PostAsync([FromForm] MediaRequestDTO mediaRequestDTO)
    {
        try
        {
            var createMedia = await _service.CreateMediaAsync(mediaRequestDTO);

            return CreatedAtRoute("GetMediaById", new { id = createMedia.Id }, createMedia);
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

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync(int id, [FromForm] MediaRequestDTO mediaRequestDTO)
    {
        try
        {
            var mediaUpdate = await _service.UpdateMediaAsync(id, mediaRequestDTO);
            if (mediaUpdate is null) 
                return NotFound();

            return Ok(mediaUpdate);
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
            var mediaDelete = await _service.GetMediaByIdAsync(id);
            await _service.DeleteMediaAsync(id);
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
