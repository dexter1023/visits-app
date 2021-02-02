using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Visits.Services;
using Visits.Models;
using Visits.Core.Authentication;
using Visits.Modules.User;

namespace Visits.Controllers
{
    [Authorize]
    [Route("api/users")]
    [ApiController]
    public class UsersController : AbstractBaseController
    {
        private readonly UserService userService;

        public UsersController(UserService _userService)
        {
            userService = _userService;
        }

        [AllowAnonymous]
        [HttpPost("register")]
        public IActionResult Register([FromBody] UserModel user)
        {
            if (userService.SaveUser(user))
            {
                return Ok();
            }
            else
            {
                return BadRequest();
            }
        }

        [AllowAnonymous]
        [HttpPost("login")]
        public IActionResult Authenticate([FromBody] AuthenticateModel auth)
        {
            var user = userService.Authenticate(auth.Username, auth.Password);
            if (user == null)
            {
                return Unauthorized(new { message = "Bad credentials" });
            }
            return Ok(user);
        }

        [AllowAnonymous]
        [HttpPost("password-reset-code")]
        public IActionResult GenerateResetCode([FromBody] PasswordCodePayload payload)
        {
            userService.GeneratePasswordResetKey(payload.email);
            return Ok();
        }

        [AllowAnonymous]
        [HttpPost("password-reset")]
        public IActionResult ResetPassword([FromBody] ResetPasswordPayload payload)
        {
            try
            {
                userService.ChangePassword(payload.email, payload.key, payload.password);
                return Ok();
            }
            catch (ArgumentException e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet]
        public IActionResult GetUser()
        {
            var user = userService.GetUserById(GetUserId());
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(user);
            }
        }

        [HttpPut]
        public IActionResult UpdateUserData([FromBody] UserDataUpdateDTO data)
        {
            try
            {
                var updatedUser = userService.UpdateUser(GetUserId(), data);
                return Ok(updatedUser);
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("password")]
        public IActionResult UpdateUserPassword([FromBody] UserPassworUpdatedDTO payload)
        {
            try
            {
                userService.UpdateUserPassword(GetUserId(), payload);
                return Ok();
            }
            catch (ArgumentOutOfRangeException e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}