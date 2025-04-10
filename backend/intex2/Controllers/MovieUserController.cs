using intex2.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace intex2.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class MoviesUserController : ControllerBase
    {
        private readonly MoviesContext _context;

        public MoviesUserController(MoviesContext context)
        {
            _context = context;
        }

        // POST: /MoviesUser/AddUserDetails
        [HttpPost("AddUserDetails")]
        public async Task<IActionResult> AddUserDetails([FromBody] MoviesUser user)
        {
            _context.MoviesUsers.Add(user);
            await _context.SaveChangesAsync();
            return Ok(new { message = "User details saved successfully!" });
        }

        // (Optional) GET endpoint for testing
        [Authorize]
        [HttpGet("All")]
        public IActionResult GetAllUsers()
        {
            var users = _context.MoviesUsers.ToList();
            return Ok(users);
        }

        [HttpGet("ByEmail/{email}")]
        public IActionResult GetUserByEmail(string email)
        {
            var user = _context.MoviesUsers.FirstOrDefault(u => u.Email == email);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            return Ok(new { userId = user.UserId });
        }

    }
}
