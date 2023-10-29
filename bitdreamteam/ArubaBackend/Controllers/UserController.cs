using System.Security.Claims;
using ArubaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace ArubaBackend.Controllers;

[ApiController]
[Route("users")]
public class UserController:ControllerBase
{
    [Authorize]
    [HttpPost("UploadUserImage")]
    public async Task<IActionResult> UploadUserImage(IFormFile userImage)
    {
        if (userImage == null || userImage.Length == 0)
        {
            return BadRequest("Please provide an image to upload.");
        }

        try
        {
            var azureBlobContext = new AzureBlobContext();
            var imageUrl = await azureBlobContext.UploadFileAsync(userImage);

            MongoDBContext context = new MongoDBContext();
            context.UpdateUserProfileImage(User.FindFirst(ClaimTypes.Email)?.Value,imageUrl);
            return Ok(new { ImageUrl = imageUrl });
        }
        catch (Exception ex)
        {
            return StatusCode(500, $"Internal server error: {ex.Message}");
        }
    }
    
    
        [Authorize]
        [HttpDelete("Harakiri")]
        public IActionResult Harakiri([FromBody] LoginDTO userLoginDto)
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
            try
            {
                mongoDbContext.DeleteUser(userFromDb.Id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Something went wrong...");
            }

            return Ok("User deleted.");
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("DeleteUser")]
        public IActionResult DeleteUser([FromBody] AdminDeleteDTO adminDeleteDTO)
        {
            // Ensure input validation (basic)
            if (string.IsNullOrWhiteSpace(adminDeleteDTO.EmailOfUserToBeDeleted) || string.IsNullOrWhiteSpace(adminDeleteDTO.AdminEmail)|| string.IsNullOrWhiteSpace(adminDeleteDTO.AdminEmail))
            {
                return BadRequest("Email and password are required.");
            }

            MongoDBContext mongoDbContext = new MongoDBContext();

            // Try to retrieve the user by email
            User userFromDb = mongoDbContext.GetUserByEmail(adminDeleteDTO.EmailOfUserToBeDeleted);
            User adminFromDb = mongoDbContext.GetUserByEmail(adminDeleteDTO.EmailOfUserToBeDeleted);
            // If the user doesn't exist or the password is incorrect, return unauthorized
            if (userFromDb == null || !adminFromDb.IsMatchingPassword(adminDeleteDTO.AdminPassword))
            {
                return Unauthorized("Invalid email or password.");
            }

            // Issue a JWT token upon successful authentication
            //To be stored securely as well...
            try
            {
                mongoDbContext.DeleteUser(userFromDb.Id);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Something went wrong...");
            }

            return Ok("User deleted.");
        }
        
        [Authorize]
        [HttpGet("GetUserDetails")]
        public async Task<IActionResult> GetUserDetails()
        {
           
            MongoDBContext mongoDbContext = new();
            UserProfileDTO? profileDTO=null;
            try
            {
                profileDTO = mongoDbContext.GetUserDetailsByEmail(User.FindFirst(ClaimTypes.Email)?.Value);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                BadRequest("Error happened :(");
            }

            return Ok(profileDTO.ToJson());
        }
        
        [Authorize]
        [HttpPut("UpdateUser")]
        public async Task<IActionResult> UpdateUser(UserProfileDTO userProfileDTO)
        {
            // Get the ID or username of the currently authenticated user from their claims.
            // Assuming you have a claim type like "id" or "nameidentifier" or "username" that holds this information.
            var userEmail = User.FindFirst(ClaimTypes.Email)?.Value;
    
            
            try
            {
                MongoDBContext mongoDbContext = new();
                mongoDbContext.UpdateUser(userProfileDTO, userEmail);
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Error here...");
            }
            
            return Ok();
        }
        [Authorize(Roles = "Admin")]
        [HttpDelete("NukeUsersDB")]
        public IActionResult DeleteUserDB([FromBody] LoginDTO userLoginDto)
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
            try
            {
                mongoDbContext.DeleteUserDB();
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest("Something went wrong...");
            }

            return Ok("User db nuked");
        }
        
}