using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using School_Spa.Models;
using School_Spa.Services;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace School_Spa.Controllers
{
    
    [Authorize]
    public class AuthController : Controller
    {
        private readonly UserManager<AppIdentityUser> _userManager;
        private readonly IOptions<IdentityOptions> _identityOptions;
        private readonly IEmailSender _emailSender;
        private readonly SignInManager<AppIdentityUser> _signInManager;
        private readonly ILogger _logger;

        public AuthController(
            UserManager<AppIdentityUser> userManager,
            IOptions<IdentityOptions> identityOptions,
            IEmailSender emailSender,
            SignInManager<AppIdentityUser> signInManager,
            ILoggerFactory loggerFactory)
        {
            _userManager = userManager;
            _identityOptions = identityOptions;
            _emailSender = emailSender;
            _signInManager = signInManager;
            _logger = loggerFactory.CreateLogger<AuthController>();
        }

        [AllowAnonymous]
        [HttpPost("~/api/auth/login")]
        [Produces("application/json")]
        public async Task<IActionResult> Login(string username, string password)
        {
            // Ensure the username and password is valid.
            var user = await _userManager.FindByNameAsync(username);
            if (user == null || !await _userManager.CheckPasswordAsync(user, password))
            {
                return BadRequest(new
                {
                    error = "", 
                    error_description = "The username or password is invalid."
                });
            }
            var result = await _signInManager.PasswordSignInAsync(username, password, false, false);
            // Ensure the email is confirmed.
            //if (!await _userManager.IsEmailConfirmedAsync(user))
            //{
            //    return BadRequest(new
            //    {
            //        error = "email_not_confirmed",
            //        error_description = "You must have a confirmed email to log in."
            //    });
            //}
           
            var role = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(ClaimsIdentity.DefaultNameClaimType, user.UserName),
                new Claim(ClaimsIdentity.DefaultRoleClaimType, role[0])
            };
            ClaimsIdentity claimsIdentity = new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, ClaimsIdentity.DefaultRoleClaimType);

            _logger.LogInformation($"User logged in (id: {user.Id})");

            var now = DateTime.UtcNow;
            var jwt = new JwtSecurityToken(
                    issuer: AuthOptions.ISSUER,
                    audience: AuthOptions.AUDIENCE,
                    notBefore: now,
                    claims: claimsIdentity.Claims,
                    expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                    signingCredentials: new SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256));
            var a = new
            {
                token = new JwtSecurityTokenHandler().WriteToken(jwt)
            };
            if (result.Succeeded)
                HttpContext.Response.Cookies.Append(".AspNetCore.Application.Id", a.token,
                new CookieOptions
                {
                    MaxAge = TimeSpan.FromMinutes(AuthOptions.LIFETIME)
                });

            return Ok(result);
           

        }
  
        [HttpPost("~/api/auth/logout")]
        [Produces("application/json")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            HttpContext.Response.Cookies.Delete(".AspNetCore.Application.Id");
            return Ok();
        }

    }
   }
