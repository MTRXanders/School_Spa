using System;
using System.Collections.Generic;
using School_Spa.Controllers.ControllerHelpers;
using School_Spa.Models;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using School_Spa.Data;
using School_Spa.ViewModels;
using Microsoft.AspNetCore.Authorization;

// For more information on enabling MVC for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace School_Spa.Controllers
{
    [ApiController]
    [Authorize]
    [Route("api/[controller]")]
    public class TestsController : Controller
    {
        private readonly IRepositoryTest _repo;
        private readonly IRepositoryQuestion _repoQ;
        private readonly AppDbContext _ctx;

        public TestsController( IRepositoryTest repositoryTest, IRepositoryQuestion repositoryQuestion , AppDbContext ctx)
        {
            _repo = repositoryTest;
            _repoQ = repositoryQuestion;
            _ctx = ctx;
        }
        //GET api/tests
        [HttpGet]
        public IEnumerable<Test> GetAll()
        {
            var tests = _repo.GetAllTests();
            return tests;
        }

        //GET api/tests/id

        [HttpGet("{id}")]
        public  Test GetTest(string id)
        {
            var test = _repo.GetTest(id);
            return test;
        }
        [HttpPost]
        public async Task Create (ViewTest vm)
        {
            foreach( Question question in vm.Questions)
            {
               await _repoQ.CreateQuestion(question);
            }
            var current = new Test();
            var result = vm.DiffUpdateProperties(current);
            await _repo.CreateTest(result);
            await _repo.SaveChangesAsync();
        }
        // GET api/tests/?=
        [HttpGet("search")]
        public IEnumerable<Test> Search(string q)
        {
            return _ctx.Test.
            Where(c =>
            c.Title.ToLower()
            .Contains(q.ToLower()))
            .OrderBy(o => o.Title);
        }
      
       // PUT api/tests/5
       [HttpPut("{id}")]
       public async Task<IActionResult> Edit(string id, ViewTest vm)
       {
            var test = _repo.GetTest(id);
            if(test == null)
            {
                    var error = new { StatusText = "There is no item with this id" };
                    return BadRequest(error);
            }
            var result = vm.DiffUpdateProperties(test);

            _repo.UpdateTest(result);
           await _repo.SaveChangesAsync();
           return Ok();
       }

       // DELETE api/tests/5
       [HttpDelete("{id}")]
       public async Task<IActionResult> Remove(string id)
       {
           _repo.RemoveTest(id);
           await _repo.SaveChangesAsync();
           return Ok();
       }
    }
}
