using Microsoft.EntityFrameworkCore;
using School_Spa.Models;
using System;

using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class RepositoryTest : IRepositoryTest
    {
        private readonly AppDbContext _ctx;

        public RepositoryTest(AppDbContext ctx)
        {
            _ctx = ctx;
        }
        public List<Test> GetAllTests()
        {
            return _ctx.Test.Include( t => t.Questions).ToList();
        }
        public Test GetTest(string id)
        {
            return _ctx.Test.FirstOrDefault(x => x.Id == id);
        }
        public async Task CreateTest(Test test)
        {
           await _ctx.Test.AddAsync(test);
        }
        public void RemoveTest(string id)
        {
            _ctx.Test.Remove(GetTest(id));
        }
        public void UpdateTest(Test test)
        {
            _ctx.Test.Update(test);
        }
        public async Task<bool> SaveChangesAsync()
        {
            if (await _ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }
    }


    public interface IRepositoryTest
    {
        List<Test> GetAllTests();
        Test GetTest(string id);
        Task CreateTest(Test test);
        void UpdateTest(Test test);
        void RemoveTest(string id);
        Task<bool> SaveChangesAsync();
    }
}
