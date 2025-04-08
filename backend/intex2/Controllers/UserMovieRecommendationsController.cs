using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex2.Data;

namespace intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]

    public class UserMovieRecommendationsController : ControllerBase
    {
        private RecommendationsContext _context;

        public UserMovieRecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        // GET: api/UserMovieRecommendations
        [HttpGet("AllRecommendations")]
        public IActionResult GetUserMovieRecommendations()
        {
            var recommendationQuery = _context.UserMovieRecommendations.ToList();
            return Ok(recommendationQuery);
        }


        // GET: api/UserMovieRecommendations/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserMovieRecommendation>> GetUserMovieRecommendation(string id)
        {
            var recommendation = await _context.UserMovieRecommendations.FindAsync(id);

            if (recommendation == null)
            {
                return NotFound();
            }

            return recommendation;
        }
    }
}
