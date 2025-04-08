using System.ComponentModel.DataAnnotations;
using intex2.Data;

public class MoviesRating
{
    [Key]
    public int Id { get; set; }

    public string ShowId { get; set; } = null!;  // still referencing ShowId string
    public int UserId { get; set; }
    public double Rating { get; set; }

    public MoviesUser User { get; set; } = null!;
    public MoviesTitle Title { get; set; } = null!;
}
