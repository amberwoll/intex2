using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;
using System.Linq;
using intex2.Data;
namespace intex2.Controllers;

[Route("[controller]")]
[ApiController]
public class RoleController : Controller
{
    private readonly RoleManager<IdentityRole> _roleManager;
    private readonly UserManager<IdentityUser> _userManager;
    private readonly MoviesContext _moviesContext;

    public RoleController(RoleManager<IdentityRole> roleManager, UserManager<IdentityUser> userManager, MoviesContext moviesContext)
    {
        _roleManager = roleManager;
        _userManager = userManager;
        _moviesContext = moviesContext;
    }
    [Authorize(Roles = "Administrator")]
    [HttpPost("AddRole")]
    public async Task<IActionResult> AddRole(string roleName)
    {
        if (string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("Role name cannot be empty.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (roleExists)
        {
            return Conflict("Role already exists.");
        }

        var result = await _roleManager.CreateAsync(new IdentityRole(roleName));
        if (result.Succeeded)
        {
            return Ok($"Role '{roleName}' created successfully.");
        }

        return StatusCode(500, "An error occurred while creating the role.");
    }
    [Authorize(Roles = "Administrator")]
    [HttpPost("AssignRoleToUser")]
    public async Task<IActionResult> AssignRoleToUser(string userEmail, string roleName)
    {
        if (string.IsNullOrWhiteSpace(userEmail) || string.IsNullOrWhiteSpace(roleName))
        {
            return BadRequest("User email and role name are required.");
        }

        var user = await _userManager.FindByEmailAsync(userEmail);
        if (user == null)
        {
            return NotFound("User not found.");
        }

        var roleExists = await _roleManager.RoleExistsAsync(roleName);
        if (!roleExists)
        {
            return NotFound("Role does not exist.");
        }

        // Check if the user already has the role
        var hasRole = await _userManager.IsInRoleAsync(user, roleName);
        if (hasRole)
        {
            return BadRequest("User already has this role.");
        }

        // Add the role
        var result = await _userManager.AddToRoleAsync(user, roleName);
        if (!result.Succeeded)
        {
            return StatusCode(500, "An error occurred while assigning the role.");
        }

        // Your existing logic to update the MoviesUser table
        var moviesUser = _moviesContext.MoviesUsers.FirstOrDefault(u => u.Email == userEmail);
        if (moviesUser != null)
        {
            moviesUser.PrivilegeLevel = roleName.ToLower() == "administrator" ? 1 : 0;
            _moviesContext.Update(moviesUser);
            await _moviesContext.SaveChangesAsync();
        }
        else
        {
            return NotFound("MoviesUser not found for the given email.");
        }

        return Ok($"Role '{roleName}' assigned to user '{userEmail}' in both Identity and Movies databases.");
    }

    [Authorize]
    [HttpGet("GetRoles")]
    public async Task<IActionResult> GetRoles()
    {
        var roles = await _roleManager.Roles.ToListAsync();
        return Ok(roles);
    }

}