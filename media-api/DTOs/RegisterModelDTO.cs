using System.ComponentModel.DataAnnotations;

namespace media_api.DTOs;

public class RegisterModel
{
    [Required(ErrorMessage = "Nome de usuário é obrigatório")]
    public string UserName { get; set; }

    [EmailAddress]
    [Required(ErrorMessage = "Email é obrigatório")]
    public string Email { get; set; }

    [Required(ErrorMessage = "A senha é obrigatória")]
    public string Password { get; set; }
}