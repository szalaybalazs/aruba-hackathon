namespace ArubaBackend.Models;

public class ProductAppUploadDTO
{
    public string Name { get; set; }
   // public IFormFile DisplayImage { get; set; }
    public decimal Price { get; set; }
    public string AuthorId { get; set; }
    public string DockerImageUrl { get; set; }
    public string DockerContainerName { get; set; }
    public string Description { get; set; }
    public string BusinessTypes { get; set; }
    public List<string> Plugins { get; set; }
    
}