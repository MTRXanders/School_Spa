using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class AppDbContext : IdentityDbContext<AppIdentityUser, ApplicationRole,string>
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options){}
        public DbSet<ApplicationUser> AppUsers { get; set; }
        public DbSet<Test> Test { get; set; }
        public DbSet<Question> Question { get; set; }
        public DbSet<TestsResult> TestsResults { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppIdentityUser>(entity =>
            {
                entity.HasOne(p => p.AppUser)
                    .WithOne(t => t.IdentityOfUser)
                    .HasForeignKey<ApplicationUser>(k => k.AppIdentityUserId)
                    .IsRequired();
                entity.HasIndex(b => b.UserName)
                .IsUnique();
            });
            builder.Entity<Test>(entity =>
            {
                entity.HasMany(q => q.Questions)
                 .WithOne(t => t.Test)
                 .HasForeignKey(q => q.TestId)
                 .OnDelete(DeleteBehavior.Cascade);
                entity.Property(x => x.Id)
                .ValueGeneratedOnAdd();
            });
            builder.Entity<Question>(entity => 
            { 
                entity.Property(x => x.Id).ValueGeneratedOnAdd(); 
            });
            builder.Entity<TestsResult>(entity =>
            {
                entity.HasOne(u => u.User)
                .WithMany(r => r.TestsResults)
                .HasForeignKey(k => k.UserId)
                .IsRequired();
            });

            builder.Entity<ApplicationUser>(entity => { 
                entity.HasIndex(b => b.UniqId)
                .IsUnique();
            });
              
           foreach (var entity in builder.Model.GetEntityTypes())
           {
               // Remove 'AspNet' prefix 
               entity.SetTableName(entity.GetTableName().Replace("AspNet", "Identity"));
           }
        }
    }
}
