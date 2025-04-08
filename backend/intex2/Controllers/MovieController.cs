using intex2.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;

namespace intex2.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class MovieController : ControllerBase
    {
        private readonly MoviesContext _movieContext;

        public MovieController(MoviesContext temp)
        {
            _movieContext = temp;
        }


        [HttpGet("AllMovies")]
        public IActionResult GetMovies(int pageHowMany = 10, int pageNum = 1, string sortOrder = "none", [FromQuery] List<string>? movieCats = null)
        {
            var moviesQuery = _movieContext.MoviesTitles.AsQueryable();


            if (movieCats != null && movieCats.Any())
            {
                // Filtering logic for categories can be added here
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

            return Ok(new { Movies = movieList, TotalMovies = totalMovies });
        }

        [HttpGet("GetMovieTypes")]
        public IActionResult GetMovieTypes()
        {
            var categoryNames = typeof(MoviesTitle)
                .GetProperties()
                .Where(p => p.PropertyType == typeof(int?) || p.PropertyType == typeof(int))
                .Where(p => p.Name != nameof(MoviesTitle.ReleaseYear))
                .Where(p => p.Name != nameof(MoviesTitle.ReleaseYear))
                .Select(p => p.Name)
                .ToList();

            return Ok(categoryNames);
        }

        [HttpPost("AddMovie")]
        public IActionResult AddMovie([FromBody] MoviesTitle newMovie)
        {
            if (string.IsNullOrEmpty(newMovie.ShowId))
            {
                var nextId = (_movieContext.MoviesTitles.Max(m => (int?)m.Id) ?? 0) + 1;
                newMovie.ShowId = $"s{nextId}";
            }

            _movieContext.MoviesTitles.Add(newMovie);
            _movieContext.SaveChanges();
            return Ok(newMovie);
        }

        [HttpPut("UpdateMovie/{showId}")]
        public IActionResult UpdateMovie(string showId, [FromBody] MoviesTitle updatedMovie)
        {
            var existingMovie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (existingMovie == null)
            {
                return NotFound($"Movie with ShowId '{showId}' not found.");
            }

            updatedMovie.Id = existingMovie.Id;
            updatedMovie.ShowId = existingMovie.ShowId;

            _movieContext.Entry(existingMovie).CurrentValues.SetValues(updatedMovie);
            _movieContext.SaveChanges();

            return Ok(updatedMovie);
        }

        [HttpDelete("DeleteMovie/{showId}")]
        public IActionResult DeleteMovie(string showId)
        {
            var movie = _movieContext.MoviesTitles.FirstOrDefault(m => m.ShowId == showId);

            if (movie == null)
                return NotFound(new { message = "Movie not found." });

            _movieContext.MoviesTitles.Remove(movie);
            _movieContext.SaveChanges();


            return NoContent();
        }
[HttpPost("GetMovieTitlesByShowIds")]
public IActionResult GetMovieTitlesByShowIds([FromBody] List<string> showIds)
{
    if (showIds == null || !showIds.Any())
        return BadRequest("No showIds provided.");

    var titles = _movieContext.MoviesTitles
        .Where(m => showIds.Contains(m.ShowId!))
        .Select(m => new { ShowId = m.ShowId, Title = m.Title })
        .ToList();

    return Ok(titles);
}

        }
    }
  
    