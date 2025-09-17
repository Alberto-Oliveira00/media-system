using System.ComponentModel.DataAnnotations;

namespace media_api.DTOs;

public class LoginModelDTO
{
    [Required(ErrorMessage = "Nome de usuário é obrigatório")]
    public string UserName { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória")]
    public string Password { get; set; }

}