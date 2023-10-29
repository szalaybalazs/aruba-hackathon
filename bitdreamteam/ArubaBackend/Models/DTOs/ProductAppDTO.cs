namespace ArubaBackend.Models;

public class ProductAppDTO
{
    public string Name { get; set; }
    public string DisplayImageUrl { get; set; }
    public decimal Price { get; set; }
    public string AuthorId { get; set; }
    public string DockerImageUrl { get; set; }
    public string DockerContainerName { get; set; }
    public string Description { get; set; }
    public UInt32 Views { get; set; }
    public UInt32 Deployments { get; set; }
    public UInt32 Likes { get; set; }
    public string BusinessTypes { get; set; }
    public List<string> Plugins { get; set; }
    
}