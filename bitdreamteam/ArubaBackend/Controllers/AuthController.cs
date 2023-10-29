using System;
using System.Net.Http;
using System.Security.Claims;
using System.Text;
using System.Text.RegularExpressions;
using System.Threading.Tasks;
using ArubaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using Newtonsoft.Json;

namespace ArubaBackend.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        [Authorize]
        [HttpGet("Expecto")]
        public async Task<IActionResult> GetSecureStuff()
        {
            return Ok("PATRONUM");
        }
        
        [Authorize]
        [HttpPut("ChangePassword")]
        public async Task<IActionResult> ChangeUserPassword(PasswordChangeDTO passwordChangeDto)
        {
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
            
            // Ensure input validation (basic)
            if (string.IsNullOrWhiteSpace(passwordChangeDto.oldPassword) || string.IsNullOrWhiteSpace(passwordChangeDto.newPassword))
            {
                return BadRequest("Email and password are required.");
            }

            MongoDBContext mongoDbContext = new MongoDBContext();

            // Try to retrieve the user by email
            User userFromDb = mongoDbContext.GetUserByEmail(userEmail);

            // If the user doesn't exist or the password is incorrect, return unauthorized
            if (userFromDb == null || !userFromDb.IsMatchingPassword(passwordChangeDto.oldPassword))
            {
                return Unauthorized("Invalid email or password.");
            }
            try
            {
                mongoDbContext.ChangePassword(passwordChangeDto,userEmail);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("There was an error....");
            }
            return Ok();
        }
        
        [HttpPost("Register")]
        public IActionResult Register([FromBody] UserDTO userDto)
        {
            // Validate user model properties using DataAnnotations
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            // Check if email is valid using regex (optional if you trust the EmailAddress annotation)
            var emailPattern = @"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$";
            if (!Regex.IsMatch(userDto.Email, emailPattern))
            {
                return BadRequest("Invalid email format.");
            }

            if (userDto.Password.Length<8)
            {
                return BadRequest("Password has to be at least 8 characters.");
            }
            // Check if user with the given email already exists
            MongoDBContext mongoDbContext = new();
            var existingUser = mongoDbContext.GetUserByEmail(userDto.Email);
            if (existingUser != null)
            {
                return BadRequest("User with this email already exists.");
            }

            // Process and save user
            try
            {
                mongoDbContext.AddUser(new User(userDto));
                return Ok();
            }
            catch (Exception ex)
            {
                if (mongoDbContext.GetUserByEmail(userDto.Email)!=null)
                {
                    return Ok();
                }
                Console.WriteLine($"{ex} Error occurred while adding user to MongoDB.");
                return StatusCode(500, "Internal server error. Please try again later.");
            }
        }
        
        [HttpPost("Login")]
        public IActionResult Login([FromBody] LoginDTO userLoginDto)
        {
            // Ensure input validation (basic)
            if (string.IsNullOrWhiteSpace(userLoginDto.Email) || string.IsNullOrWhiteSpace(userLoginDto.Password))
            {
                return BadRequest("Email and password are required.");
            }

            MongoDBContext mongoDbContext = new MongoDBContext();

            // Try to retrieve the user by email
            User userFromDb = mongoDbContext.GetUserByEmail(userLoginDto.Email);

            // If the user doesn't exist or the password is incorrect, return unauthorized
            if (userFromDb == null || !userFromDb.IsMatchingPassword(userLoginDto.Password))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Issue a JWT token upon successful authentication
            //To be stored securely as well...
            var tokenAuth = new TokenAuth("ArubaWeby -this is a padding to be long enough...", "ArubaWeby");
            var jwtToken = tokenAuth.IssueToken(userFromDb);

            var userProfile=new UserProfileDTO()
            {
                FirstName = userFromDb.FirstName,
                LastName = userFromDb.LastName,
                City = userFromDb.Address?.City,
                Country = userFromDb.Address?.Country,
                Email = userFromDb.Email,
                State = userFromDb.Address?.State,
                StreetAddress = userFromDb.Address?.StreetAddress,
                ZipCode = userFromDb.Address?.ZipCode,
                ProfileImageUrl = userFromDb.ProfileImageUrl
            };

            return Ok(new { token = jwtToken,user= userProfile});
        }

        
    }
}
