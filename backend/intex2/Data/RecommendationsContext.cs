using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace intex2.Data;

public partial class RecommendationsContext : DbContext
{
    public RecommendationsContext()
    {
    }

    public RecommendationsContext(DbContextOptions<RecommendationsContext> options)
        : base(options)
    {
    }

    public virtual DbSet<HighRatedContentRecommendation> HighRatedContentRecommendations { get; set; }

    public virtual DbSet<HybridContentRecommendation> HybridContentRecommendations { get; set; }

    public virtual DbSet<UserMovieRecommendation> UserMovieRecommendations { get; set; }

    public virtual DbSet<UserTvRecommendation> UserTvRecommendations { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlite("Data Source=recommendations.db");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<HighRatedContentRecommendation>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("highRatedContentRecommendations");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation_1");
            entity.Property(e => e.Recommendation10).HasColumnName("Recommendation_10");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation_2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation_3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation_4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation_5");
            entity.Property(e => e.Recommendation6).HasColumnName("Recommendation_6");
            entity.Property(e => e.Recommendation7).HasColumnName("Recommendation_7");
            entity.Property(e => e.Recommendation8).HasColumnName("Recommendation_8");
            entity.Property(e => e.Recommendation9).HasColumnName("Recommendation_9");
        });

        modelBuilder.Entity<HybridContentRecommendation>(entity =>
        {
            entity.HasKey(e => e.ShowId);

            entity.ToTable("hybridContentRecommendations");

            entity.Property(e => e.ShowId).HasColumnName("show_id");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation_1");
            entity.Property(e => e.Recommendation10).HasColumnName("Recommendation_10");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation_2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation_3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation_4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation_5");
            entity.Property(e => e.Recommendation6).HasColumnName("Recommendation_6");
            entity.Property(e => e.Recommendation7).HasColumnName("Recommendation_7");
            entity.Property(e => e.Recommendation8).HasColumnName("Recommendation_8");
            entity.Property(e => e.Recommendation9).HasColumnName("Recommendation_9");
            entity.Property(e => e.Source).HasColumnName("source");
        });

        modelBuilder.Entity<UserMovieRecommendation>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("userMovieRecommendations");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation_1");
            entity.Property(e => e.Recommendation10).HasColumnName("Recommendation_10");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation_2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation_3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation_4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation_5");
            entity.Property(e => e.Recommendation6).HasColumnName("Recommendation_6");
            entity.Property(e => e.Recommendation7).HasColumnName("Recommendation_7");
            entity.Property(e => e.Recommendation8).HasColumnName("Recommendation_8");
            entity.Property(e => e.Recommendation9).HasColumnName("Recommendation_9");
        });

        modelBuilder.Entity<UserTvRecommendation>(entity =>
        {
            entity.HasKey(e => e.UserId);

            entity.ToTable("userTvRecommendations");

            entity.Property(e => e.UserId).HasColumnName("user_id");
            entity.Property(e => e.Recommendation1).HasColumnName("Recommendation_1");
            entity.Property(e => e.Recommendation10).HasColumnName("Recommendation_10");
            entity.Property(e => e.Recommendation2).HasColumnName("Recommendation_2");
            entity.Property(e => e.Recommendation3).HasColumnName("Recommendation_3");
            entity.Property(e => e.Recommendation4).HasColumnName("Recommendation_4");
            entity.Property(e => e.Recommendation5).HasColumnName("Recommendation_5");
            entity.Property(e => e.Recommendation6).HasColumnName("Recommendation_6");
            entity.Property(e => e.Recommendation7).HasColumnName("Recommendation_7");
            entity.Property(e => e.Recommendation8).HasColumnName("Recommendation_8");
            entity.Property(e => e.Recommendation9).HasColumnName("Recommendation_9");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
