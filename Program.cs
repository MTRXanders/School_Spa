using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using School_Spa.Data;
using School_Spa.Models;

namespace School_Spa
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            try
            {
                var scope = host.Services.CreateScope();
                var ctx = scope.ServiceProvider.GetRequiredService<AppDbContext>();
                var identityMgr = scope.ServiceProvider.GetRequiredService<UserManager<AppIdentityUser>>();
                var roleMgr = scope.ServiceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
               
                ctx.Database.EnsureCreated();
                var adminRole = new ApplicationRole { Name="Admin"};
                var studentRole = new ApplicationRole {Name = "Student"};
                var teacherRole = new ApplicationRole {Name = "Teacher"};
                if (!ctx.Roles.Any())
                {
                    //create a default role 
                    roleMgr.CreateAsync(adminRole).GetAwaiter().GetResult();
                    roleMgr.CreateAsync(studentRole).GetAwaiter().GetResult();
                    roleMgr.CreateAsync(teacherRole).GetAwaiter().GetResult();
                }
                if (!ctx.Users.Any(u => u.UserName == "admin"))
                {
                    //create default identity of admin
                    var identity = new AppIdentityUser{UserName = "admin",Email = "admin@school_spa.com"};
                   
                    // create default students
                    AppIdentityUser identity_0 = new AppIdentityUser{UserName = "Chipolino", Email = "chipolino@hotmail.com"};
                    AppIdentityUser identity_1 = new AppIdentityUser{UserName = "Churchhela", Email = "churchhela@hotmail.com"};
                    AppIdentityUser identity_2 = new AppIdentityUser{UserName = "Batko", Email = "batko@hotmail.com" };

                    ApplicationUser profile_0 = new ApplicationUser { LastName = "Da Polento", FirstName = "Chipolino", Gender = "Male", UniqId = "Tears", Patronymic="Lucovich", AppIdentityUserId= identity_0.Id };
                    ApplicationUser profile_1 = new ApplicationUser { LastName = "Churchill", FirstName = "Winston", Gender = "Male", UniqId = "Kindom", Patronymic = "Spencer", AppIdentityUserId = identity_1.Id };
                    ApplicationUser profile_2 = new ApplicationUser { LastName = "Lukoshenko", FirstName = "Alexander", Gender = "Male", UniqId = "Bulba", Patronymic = "Grigorievich",  AppIdentityUserId = identity_2.Id };
                                       
                    identityMgr.CreateAsync(identity, "password").GetAwaiter().GetResult();
                    identityMgr.CreateAsync(identity_0, "P0ssw0rd!").GetAwaiter().GetResult();
                    identityMgr.CreateAsync(identity_1, "P1ssw0rd!").GetAwaiter().GetResult();
                    identityMgr.CreateAsync(identity_2, "P2ssw0rd!").GetAwaiter().GetResult();

                    identityMgr.AddToRoleAsync(identity, adminRole.Name).GetAwaiter().GetResult();
                    identityMgr.AddToRoleAsync(identity_0, "Student").GetAwaiter().GetResult(); 
                    identityMgr.AddToRoleAsync(identity_1, "Student").GetAwaiter().GetResult(); 
                    identityMgr.AddToRoleAsync(identity_2, "Student").GetAwaiter().GetResult();

                    ctx.AppUsers.Add(profile_0);
                    ctx.AppUsers.Add(profile_1);
                    ctx.AppUsers.Add(profile_2);

                    ctx.SaveChanges();
                }
            }
            catch (Exception e)
            {
                Console.WriteLine(e.Message);
            }
            host.Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
