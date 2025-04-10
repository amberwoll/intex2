using intex2.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    // [Authorize]
    public class MovieController : ControllerBase
    {
        private readonly MoviesContext _movieContext;
        private readonly RecommendationsContext _recsContext;

        public MovieController(MoviesContext movieContext, RecommendationsContext recsContext)
        {
            _movieContext = movieContext;
            _recsContext = recsContext;
        }

        [HttpGet("AllMovies")]
        public IActionResult GetMovies([FromQuery] int pageHowMany, [FromQuery] int pageNum, [FromQuery] string sortOrder = "none", [FromQuery] List<string>? movieCats = null)
        {
            var moviesQuery = _movieContext.MoviesTitles.AsQueryable();

            if (movieCats != null && movieCats.Any())
            {
                // Optional filtering
            }

            var totalMovies = moviesQuery.Count();

            if (sortOrder.ToLower() == "asc")
                moviesQuery = moviesQuery.OrderBy(m => m.Title);
            else if (sortOrder.ToLower() == "desc")
                moviesQuery = moviesQuery.OrderByDescending(m => m.Title);

            var movieList = moviesQuery
                .Skip((pageNum - 1) * pageHowMany)
                .Take(pageHowMany)
                .ToList();

            return Ok(new { movies = movieList, totalMovies });
        }
        
        [HttpGet("{showId}")]
        public IActionResult GetMovieByShowId(string showId)
        {
            var movie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);
            if (movie == null)
                return NotFound();
            return Ok(movie);
        }

        [HttpPost("Rate")]
    public IActionResult RateMovie([FromBody] MoviesRating rating)
    {
        if (rating == null || string.IsNullOrEmpty(rating.ShowId) || rating.UserId == 0)
        {
            return BadRequest("Invalid rating data");
        }

        // Check if rating exists first
        var existing = _movieContext.MoviesRatings.FirstOrDefault(r =>
            r.UserId == rating.UserId && r.ShowId == rating.ShowId);

        if (existing != null)
        {
            existing.Rating = rating.Rating;
        }
        else
        {
            _movieContext.MoviesRatings.Add(rating);
        }

        _movieContext.SaveChanges();
        return Ok(new { message = "Rating submitted successfully." });
    }


        [HttpGet("GetMovieTypes")]
        public IActionResult GetMovieTypes()
        {
            var categoryNames = typeof(MoviesTitle)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(int?) || p.PropertyType == typeof(int))
                .Where(p => p.Name != nameof(MoviesTitle.ReleaseYear))
                .Select(p => p.Name)
                .ToList();

            return Ok(categoryNames);
        }

[Authorize(Roles = "Administrator")]
[HttpPost("AddMovie")]
public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
{
    // Automatically generate a ShowId if not provided
    if (string.IsNullOrWhiteSpace(newMovie.ShowId))
    {
        newMovie.ShowId = $"s{Guid.NewGuid().ToString().Replace("-", "").Substring(0, 8)}";
    }

    // Check if the generated ShowId already exists
    var exists = _movieContext.MoviesTitles.Any(m => m.ShowId == newMovie.ShowId);
    if (exists)
    {
        return Conflict("Generated ShowId already exists. Try again.");
    }

    _movieContext.MoviesTitles.Add(newMovie);
    _movieContext.SaveChanges();

    return Ok(newMovie);
}
        [Authorize(Roles = "Administrator")]
        [HttpPut("UpdateMovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);
            if (existingMovie == null)
                return NotFound($"Movie with ShowId '{showId}' not found.");

            updatedMovie.Id = existingMovie.Id;
            updatedMovie.ShowId = existingMovie.ShowId;

            _movieContext.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);
            _movieContext.SaveChanges();

            return Ok(updatedMovie);
        }
[Authorize(Roles = "Administrator")]
[HttpDelete("Delete/{showId}")]
public IActionResult DeleteMovie(string showId)
{
    var movie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

    if (movie == null)
    {
        return NotFound("Movie not found.");
    }

    _movieContext.MoviesTitles.Remove(movie);
    _movieContext.SaveChanges();

    return Ok($"Movie {showId} deleted successfully.");
}


        [HttpPost("GetMovieTitlesByShowIds")]
        public IActionResult GetMovieTitlesByShowIds([FromBody] List<string> showIds)
        {
            if (showIds == null || !showIds.Any())
                return BadRequest("No showIds provided.");

            var titles = _movieContext.MoviesTitles
                .Where(m => showIds.Contains(m.ShowId!))
                .Select(m => new { m.ShowId, m.Title })
                .ToList();

            return Ok(titles);
        }

        [HttpGet("TopRatedMovies")]
        public IActionResult GetTopRatedMovies()
        {
            var topRated = _movieContext.MoviesRatings
                .GroupBy(r => r.ShowId)
                .Select(g => new
                {
                    ShowId = g.Key,
                    AvgRating = g.Average(r => r.Rating)
                })
                .OrderByDescending(g => g.AvgRating)
                .Take(10)
                .Join(
                    _movieContext.MoviesTitles,
                    r => r.ShowId,
                    m => m.ShowId,
                    (r, m) => new
                    {
                        m.Title,
                        m.ShowId,
                        AvgRating = r.AvgRating
                    }
                )
                .ToList();

            return Ok(topRated);
        }

        [HttpGet("HighRatedRecs/{userId}")]
        public IActionResult GetHighRatedRecommendations(string userId)
        {
            var rec = _recsContext.HighRatedContentRecommendations
                .FirstOrDefault(r => r.UserId == userId);

            if (rec == null)
                return NotFound("No recommendations found for this user.");

            var showIds = new[]
            {
                rec.Recommendation1,
                rec.Recommendation2,
                rec.Recommendation3,
                rec.Recommendation4,
                rec.Recommendation5,
                rec.Recommendation6,
                rec.Recommendation7,
                rec.Recommendation8,
                rec.Recommendation9,
                rec.Recommendation10
            }
            .Where(id => !string.IsNullOrWhiteSpace(id))
            .ToList();

            if (!showIds.Any())
                return Ok(new List<object>()); // return empty array

            var movieTitles = _movieContext.MoviesTitles
                .Where(m => showIds.Contains(m.ShowId!))
                .Select(m => new { m.ShowId, m.Title })
                .ToList();

            return Ok(movieTitles);
        }

        [HttpGet("HybridRecommendations/{showId}")]
public async Task<IActionResult> GetHybridRecommendations(string showId)
{
    var rec = await _recsContext.HybridContentRecommendations.FindAsync(showId);
    if (rec == null)
    {
        return NotFound();
    }

    var recIds = new List<string?>
    {
        rec.Recommendation1, rec.Recommendation2, rec.Recommendation3,
        rec.Recommendation4, rec.Recommendation5, rec.Recommendation6,
        rec.Recommendation7, rec.Recommendation8, rec.Recommendation9,
        rec.Recommendation10
    }
    .Where(id => !string.IsNullOrWhiteSpace(id))
    .ToList();

    var movieTitles = await _movieContext.MoviesTitles
        .Where(m => recIds.Contains(m.ShowId!))
        .Select(m => new { m.ShowId, m.Title })
        .ToListAsync();

    return Ok(movieTitles);
}

[HttpGet("GetUserRating/{userId}/{showId}")]
public IActionResult GetUserRating(int userId, string showId)
{
    var rating = _movieContext.MoviesRatings
        .FirstOrDefault(r => r.UserId == userId && r.ShowId == showId);

    if (rating == null)
        return Ok(0); // No rating yet

    return Ok(rating.Rating);
}


    }
}
