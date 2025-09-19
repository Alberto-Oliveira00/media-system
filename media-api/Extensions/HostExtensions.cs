using Microsoft.AspNetCore.Identity;
using media_api.Models;

namespace media_api.Extensions;

public static class HostExtensions
{
    public static async Task InitialDataAsync(this IHost host)
    {
        using (var scope = host.Services.CreateScope())
        {
            var services = scope.ServiceProvider;
            var userManager = services.GetRequiredService<UserManager<ApplicationUser>>();
            var roleManager = services.GetRequiredService<RoleManager<IdentityRole>>();

            string adminRoleName = "Admin";
            string adminEmail = "admin@example.com";
            string adminPassword = "Admin@123";

            try
            {
                if (!await roleManager.RoleExistsAsync(adminRoleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(adminRoleName));
                    Console.WriteLine("Role 'Admin' criada.");
                }

                var adminUser = await userManager.FindByNameAsync(adminEmail);
                if (adminUser == null)
                {
                    var user = new ApplicationUser
                    {
                        UserName = adminEmail,
                        Email = adminEmail,
                        EmailConfirmed = true
                    };
                    var result = await userManager.CreateAsync(user, adminPassword);
                    if (result.Succeeded)
                    {
                        Console.WriteLine("Usuário 'admin' criado.");
                        await userManager.AddToRoleAsync(user, adminRoleName);
                        Console.WriteLine("Usuário 'admin' adicionado à role 'Admin'.");
                    }
                    else
                    {
                        Console.WriteLine($"Erro ao criar o usuário 'admin': {string.Join(", ", result.Errors.Select(e => e.Description))}");
                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Erro ao semear dados: {ex.Message}");
            }
        }
    }
}