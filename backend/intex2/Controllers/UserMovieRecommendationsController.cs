using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex2.Data;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Linq;

namespace intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserMovieRecommendationsController : ControllerBase
    {
        private readonly RecommendationsContext _context;

        public UserMovieRecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        [HttpGet("AllRecommendations")]
        public IActionResult GetUserMovieRecommendations()
        {
            var recommendationQuery = _context.UserMovieRecommendations.ToList();
            return Ok(recommendationQuery);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<UserMovieRecommendation>> GetUserMovieRecommendation(string id)
        {
            var recommendation = await _context.UserMovieRecommendations.FindAsync(id);
            if (recommendation == null)
                return NotFound();
            return recommendation;
        }
    }
}
