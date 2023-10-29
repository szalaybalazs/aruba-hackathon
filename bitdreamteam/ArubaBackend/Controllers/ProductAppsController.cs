using System.Security.Claims;
using ArubaBackend.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;

namespace ArubaBackend.Controllers;

[ApiController]
[Route("apps")]
public class ProductAppsController:ControllerBase
{
    private readonly AzureBlobContext _context;

    public ProductAppsController()
    {
        _context = new AzureBlobContext();
    }
    
    [Authorize]
    [HttpPost("UploadWebApp")]

    public async Task<IActionResult> UploadWebApp([FromForm] ProductAppUploadDTO productAppDto,IFormFile uploadImage)
    {
        try
        {
            string displayImageUrl=await _context.UploadFileAsync(uploadImage);
            
            MongoDBContext mongoDbContext = new();
            string authorId=mongoDbContext.GetUserByEmail(User.FindFirst(ClaimTypes.Email)?.Value).Id;
            mongoDbContext.UploadWebApp(new ProductAppDTO()
            {
                AuthorId = authorId,
                BusinessTypes = productAppDto.BusinessTypes,
                Description = productAppDto.Description,
                DisplayImageUrl = displayImageUrl,
                DockerContainerName = productAppDto.DockerContainerName,
                Name = productAppDto.Name,
                Plugins = productAppDto.Plugins,
                Likes = 0,
                Price = productAppDto.Price,
                Deployments = 0,
                Views = 0
            });
        }
        catch (Exception e)
        {
            Console.WriteLine(e);
            return BadRequest("Some godforsaken error occured");
        }
        return Ok("Webapp submitted");
    }

    [HttpGet("GetWebApps")]
    public async Task<IActionResult> GetWebApps([FromQuery] string searchFilter = "", 
        [FromQuery] string businessFilter = "", 
        [FromQuery] List<string> pluginFilter = null, 
        [FromQuery] string sort = "")
    {
        MongoDBContext mongoDbContext = new();
        List<ProductApp> apps = mongoDbContext.GetAllWebApps();

        // Filter by search string
        if (!string.IsNullOrWhiteSpace(searchFilter))
        {
            apps = apps.Where(a => a.Name.Contains(searchFilter) || 
                                   a.BusinessType.Contains(searchFilter) || 
                                   a.AuthorId.Contains(searchFilter) || 
                                   a.Plugins.Any(p => searchFilter.Contains(p))).ToList();
        }

        // Filter by business type
        if (!string.IsNullOrWhiteSpace(businessFilter))
        {
            apps = apps.Where(a => a.BusinessType == businessFilter).ToList();
        }

        // Filter by plugins
        if (pluginFilter != null && pluginFilter.Any())
        {
            apps = apps.Where(a => a.Plugins.Intersect(pluginFilter).Any()).ToList();
        }

        // Sorting logic
        switch (sort)
        {
            case "views":
                apps = apps.OrderByDescending(a => a.Views).ToList();
                break;
            case "deployments":
                apps = apps.OrderByDescending(a => a.Deployments).ToList();
                break;
            case "likes":
                apps = apps.OrderByDescending(a => a.Likes).ToList();
                break;
            default:
                break;
        }

        // Convert to DTOs
        List<ProductAppDTO> dtos = apps.Select(a => new ProductAppDTO
        {
            Name = a.Name,
            DisplayImageUrl = a.DisplayImageUrl,
            Price = a.Price,
            AuthorId = a.AuthorId,
            DockerImageUrl = a.DockerImageUrl,
            DockerContainerName = a.DockerContainerName,
            Description = a.Description,
            Views = a.Views,
            Deployments = a.Deployments,
            Likes = a.Likes,
            BusinessTypes = a.BusinessType,
            Plugins = a.Plugins
        }).ToList();

        return Ok(dtos.ToJson());
    }
}