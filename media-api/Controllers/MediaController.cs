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
        var medias = await _service.GetAllMediasAsync();

        if (medias == null)
            return NoContent();

        return Ok(medias);
    }

    [HttpGet("{id:int}", Name = "GetMediaById")]
    public async Task<ActionResult<MediaResponseDTO>> GetByIdAsync(int id)
    {
        var media = await _service.GetMediaByIdAsync(id);
        return Ok(media);
    }

    [HttpPost]
    public async Task<ActionResult<MediaResponseDTO>> PostAsync([FromForm] MediaRequestDTO mediaRequestDTO)
    {
        var createMedia = await _service.CreateMediaAsync(mediaRequestDTO);

        return CreatedAtRoute("GetMediaById", new { id = createMedia.Id }, createMedia);
        
    }

    [HttpPut("{id:int}")]
    public async Task<IActionResult> PutAsync(int id, [FromForm] MediaRequestDTO mediaRequestDTO)
    {
        var mediaUpdate = await _service.UpdateMediaAsync(id, mediaRequestDTO);
        if (mediaUpdate is null) 
            return NotFound();

        return Ok(mediaUpdate);        
    }

    [HttpDelete("{id:int}")]
    public async Task<IActionResult> DeleteAsync(int id)
    {
        var mediaDelete = await _service.GetMediaByIdAsync(id);
        await _service.DeleteMediaAsync(id);
        return NoContent();
    }
}
