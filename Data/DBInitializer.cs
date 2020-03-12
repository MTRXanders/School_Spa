using Microsoft.AspNetCore.Identity;
using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class DBInitializer : IDBInitializer
    {
        private readonly AppDbContext ctx;
        private readonly UserManager<AppIdentityUser> identityMgr;
        private readonly RoleManager<ApplicationRole> roleMgr;

        public DBInitializer(AppDbContext context, UserManager<AppIdentityUser> userManager, RoleManager<ApplicationRole> roleManager)
        {
            identityMgr = userManager;
            ctx = context;
            roleMgr = roleManager;
        }
        public bool EnsureCreated()
        {
            return ctx.Database.EnsureCreated();
        }

        public async Task Seed()
        {
            ctx.Database.EnsureCreated();
            var adminRole = new ApplicationRole { Name = "Admin" };
            var studentRole = new ApplicationRole { Name = "Student" };
            var teacherRole = new ApplicationRole { Name = "Teacher" };
            if (!ctx.Roles.Any())
            {
                //create a default role 
               await roleMgr.CreateAsync(adminRole);
               await roleMgr.CreateAsync(studentRole);
               await roleMgr.CreateAsync(teacherRole);
            }
            if (!ctx.Users.Any(u => u.UserName == "admin"))
            {
                //create default identity of admin
                var identity = new AppIdentityUser { UserName = "admin", Email = "admin@school_spa.com" };

                // create default students
                AppIdentityUser identity_0 = new AppIdentityUser { UserName = "Chipolino", Email = "chipolino@hotmail.com" };
                AppIdentityUser identity_1 = new AppIdentityUser { UserName = "Churchhela", Email = "churchhela@hotmail.com" };
                AppIdentityUser identity_2 = new AppIdentityUser { UserName = "Batko", Email = "batko@hotmail.com" };

                ApplicationUser profile_0 = new ApplicationUser { LastName = "Da Polento", FirstName = "Chipolino", Gender = "Male", UniqId = "Tears", Patronymic = "Lucovich", AppIdentityUserId = identity_0.Id };
                ApplicationUser profile_1 = new ApplicationUser { LastName = "Churchill", FirstName = "Winston", Gender = "Male", UniqId = "Kindom", Patronymic = "Spencer", AppIdentityUserId = identity_1.Id };
                ApplicationUser profile_2 = new ApplicationUser { LastName = "Lukoshenko", FirstName = "Alexander", Gender = "Male", UniqId = "Bulba", Patronymic = "Grigorievich", AppIdentityUserId = identity_2.Id };

                await identityMgr.CreateAsync(identity, "password");
                await identityMgr.CreateAsync(identity_0, "P0ssw0rd!");
                await identityMgr.CreateAsync(identity_1, "P1ssw0rd!");
                await identityMgr.CreateAsync(identity_2, "P2ssw0rd!");

                await identityMgr.AddToRoleAsync(identity, adminRole.Name);
                await identityMgr.AddToRoleAsync(identity_0, "Student");
                await identityMgr.AddToRoleAsync(identity_1, "Student");
                await identityMgr.AddToRoleAsync(identity_2, "Student");

                await ctx.AppUsers.AddAsync(profile_0);
                await ctx.AppUsers.AddAsync(profile_1);
                await ctx.AppUsers.AddAsync(profile_2);

                ctx.SaveChanges();
            }
        }
        public async Task TestingSeed()
        {
            if (!ctx.Test.Any())
            {
                Test test_0 = new Test
                {
                    Title = "Default",
                    Theme = "Alexander's tastes"
                };
                var Questions = new List<Question>();

                Question question_0 = new Question
                {
                    Value = "What is my favorite soup?",
                    Options = "Tom Yam/Strachtella/Green Bosch with sorrel/Shulum",
                    Goal= "Green Borsch with sorrel",
                    Test = test_0
                };
                Question question_1 = new Question
                {
                    Value = "Favorite second dish",
                    Options = "Steak/Shashlic/Falafel/Salmon Steak",
                    Goal = "Shashlic",
                    Test =test_0
                };
                Question question_2 = new Question
                {
                    Value = "Favorite desert",
                    Options = "Pancho/Tiramisu/Napoleon cake/Milkshake",
                    Goal = "Napoleon cake",
                    Test = test_0
                };
                Questions.Add(question_0);
                Questions.Add(question_1);
                Questions.Add(question_2);
                test_0.Questions = Questions;

                await ctx.Question.AddRangeAsync(test_0.Questions);
                await ctx.Test.AddAsync(test_0);
                await ctx.SaveChangesAsync();
            }
        }
    }

    public interface IDBInitializer
    {
        bool EnsureCreated();
        Task Seed();
        Task TestingSeed();
    }
}
