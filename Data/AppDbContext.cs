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
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
        {

        }
        public DbSet<ApplicationUser> AppUsers { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<AppIdentityUser>()
                .HasOne(p => p.AppUser)
                .WithOne(t => t.IdentityOfUser)
                .HasForeignKey<ApplicationUser>(k => k.AppIdentityUserId).IsRequired();
            builder.Entity<ApplicationUser>().HasIndex(b => b.UniqId).IsUnique();
            builder.Entity<AppIdentityUser>().HasIndex(b => b.UserName).IsUnique();
           foreach (var entity in builder.Model.GetEntityTypes())
           {
               // Remove 'AspNet' prefix 
               entity.SetTableName(entity.GetTableName().Replace("AspNet", "Identity"));
          
           }
        }
    }
}
