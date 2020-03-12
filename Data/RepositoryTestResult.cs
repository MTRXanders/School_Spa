using Microsoft.EntityFrameworkCore;
using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class RepositoryTestResult : IRepositoryTestResult
    {
        private readonly AppDbContext _ctx;

        public RepositoryTestResult(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public List<TestsResult> GetAllTests()
        {
            return _ctx.TestsResults.Include((tr) => tr.Test ).ThenInclude(q =>q.Questions).ToList();
        }
        public List<TestsResult> GetAllTestsResultsOneUser(string id)
        {
            return _ctx.TestsResults.Where(x => x.UserId == id).Include(tr => tr.Test).ThenInclude(q=>q.Questions).ToList();
        }

        public List<TestsResult> GetTestResultsAllUsers(string id)
        {
            return _ctx.TestsResults.Where(x => x.TestId == id).ToList();
        }

        public TestsResult GetTestResult(string id)
        {
            return _ctx.TestsResults.FirstOrDefault(x => x.Id == id);
        }

        public async Task CreateTestResult(TestsResult tr)
        {
            await _ctx.TestsResults.AddAsync(tr);
        }

        public void DeleteTestResult(string id)
        {
            _ctx.TestsResults.Remove(GetTestResult(id));
        }
        public void UpdateTestResult(TestsResult tr)
        {
            _ctx.TestsResults.Update(tr);
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
    public interface IRepositoryTestResult
    {
        List<TestsResult> GetTestResultsAllUsers(string id);
        List<TestsResult> GetAllTestsResultsOneUser(string id);
        TestsResult GetTestResult(string id);
        Task CreateTestResult(TestsResult tr);
        void UpdateTestResult(TestsResult tr);
        void DeleteTestResult(string id);
        Task<bool> SaveChangesAsync();
    }
}
