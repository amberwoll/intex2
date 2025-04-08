using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace intex2.Data;

public partial class HighRatedContentRecommendation
{
    [Key]
    [Required]
    public string UserId { get; set; } = null!;

    public string? Recommendation1 { get; set; }

    public string? Recommendation2 { get; set; }

    public string? Recommendation3 { get; set; }

    public string? Recommendation4 { get; set; }

    public string? Recommendation5 { get; set; }

    public string? Recommendation6 { get; set; }

    public string? Recommendation7 { get; set; }

    public string? Recommendation8 { get; set; }

    public string? Recommendation9 { get; set; }

    public string? Recommendation10 { get; set; }
}
