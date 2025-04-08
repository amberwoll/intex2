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
        private readonly RecommendationsContext _context;

        public UserMovieRecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        // GET: api/UserMovieRecommendations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserMovieRecommendation>>> GetUserMovieRecommendations()
        {
            return await _context.UserMovieRecommendations.ToListAsync();
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
