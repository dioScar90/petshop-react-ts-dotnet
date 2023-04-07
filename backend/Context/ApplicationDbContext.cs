using Microsoft.EntityFrameworkCore;
using backend.Entities;

namespace backend.Context;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }

    public DbSet<ProductEntity> Products { get; set; }
}