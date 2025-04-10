using System.ComponentModel.DataAnnotations; // For [Key]
using System.ComponentModel.DataAnnotations.Schema; // Optional, for EF config if needed
using intex2.Data; // For MoviesUser and MoviesTitle

namespace intex2.Data
{
    public class MoviesRating
    {
        [Key]
        public int Id { get; set; }

        public string ShowId { get; set; } = null!;
        public int UserId { get; set; }
        public double Rating { get; set; }

        // ✅ These are now optional (nullable)
        public MoviesUser? User { get; set; }
        public MoviesTitle? Title { get; set; }
    }
}
