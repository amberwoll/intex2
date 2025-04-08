using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using intex2.Data;

namespace intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class UserTvRecommendationsController : ControllerBase
    {
        private readonly RecommendationsContext _context;

        public UserTvRecommendationsController(RecommendationsContext context)
        {
            _context = context;
        }

        // GET: api/UserTvRecommendations
        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserTvRecommendation>>> GetUserTvRecommendations()
        {
            return await _context.UserTvRecommendations.ToListAsync();
        }

        // GET: api/UserTvRecommendations/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<UserTvRecommendation>> GetUserTvRecommendation(string id)
        {
            var recommendation = await _context.UserTvRecommendations.FindAsync(id);

            if (recommendation == null)
            {
                return NotFound();
            }

            return recommendation;
        }
    }
}
