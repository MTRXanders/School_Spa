using Microsoft.EntityFrameworkCore;
using School_Spa.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace School_Spa.Data
{
    public class RepositoryQuestion : IRepositoryQuestion
    {
        private readonly AppDbContext _ctx;

        public RepositoryQuestion(AppDbContext ctx)
        {
            _ctx = ctx;
        }

        public async Task CreateQuestion(Question question)
        {
            await _ctx.Question.AddAsync(question);
        }

        public async Task<List<Question>> GetAllQuestions()
        {
           return  await  _ctx.Question.ToListAsync();
        }

        public Task<Question> GetQuestion(string id)
        {
            var val =_ctx.Question.FirstOrDefaultAsync(x=>x.Id == id);
            return val;
        }

        public async Task RemoveQuestion(string id)
        {
            var res = await GetQuestion(id);
            _ctx.Question.Remove(res);
        }

        public async Task<bool> SaveChangesAsync()
        {
            if (await _ctx.SaveChangesAsync() > 0)
            {
                return true;
            }
            return false;
        }

        public void UpdateQuestion(Question question)
        {
            _ctx.Question.Update(question);
        }
    }
    public interface IRepositoryQuestion
    {
        Task<List<Question>> GetAllQuestions();
        Task<Question> GetQuestion(string id);
        Task CreateQuestion(Question question);
        void UpdateQuestion(Question question);
        Task RemoveQuestion(string id);
        Task<bool> SaveChangesAsync();
    }
}
