using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace ArubaBackend.Models;

public class ProductApp
{
    [BsonId]
    public ObjectId Id { get; set; }
    public string Name { get; set; }
    public string DisplayImageUrl { get; set; }
    //public DateTime CreationDate { get; set; }
    public decimal Price { get; set; }
    public string AuthorId { get; set; }
    public string DockerImageUrl { get; set; }
    public string DockerContainerName { get; set; }
    public string Description { get; set; }
    public UInt32 Views { get; set; }
    public UInt32 Deployments { get; set; }
    public UInt32 Likes { get; set; }
    public string BusinessType { get; set; }
    public List<string> Plugins { get; set; }
    
    public ProductApp(string name,decimal price,string authorId, string dockerImageUrl, string dockerContainerName, string businessType,List<string> plugins, string description="",string displayImageUrl="")
    {
        this.Name = name;
        this.Price = price;
        this.AuthorId = authorId;
        this.DockerImageUrl = dockerImageUrl;
        this.DockerContainerName = dockerContainerName;
        this.Description = description;
        this.DisplayImageUrl = displayImageUrl;
        this.Views = 0;
        this.Deployments = 0;
        this.Likes = 0;
        this.BusinessType = businessType;
        this.Plugins = plugins;
    }

    public ProductApp()
    {
        
    }
}