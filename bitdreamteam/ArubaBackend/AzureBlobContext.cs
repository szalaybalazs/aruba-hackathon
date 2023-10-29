using ArubaBackend.Models;
using Azure.Storage.Blobs.Models;

namespace ArubaBackend;
using Azure.Storage.Blobs;

using System.Threading.Tasks;

public class AzureBlobContext
{
    private readonly string connectionString = "DefaultEndpointsProtocol=https;AccountName=arubablob;AccountKey=C/9hxPZ/4Ay/53h5rd4Xe3Ap0YixtCrOghZE3j34Q0UHNTnf0RcueTg1KUAVMCzcUmLEOhuSiA61+AStAgXJrg==;EndpointSuffix=core.windows.net";
    private readonly BlobServiceClient blobServiceClient;
    private readonly BlobContainerClient containerClient;

    public AzureBlobContext()
    {
        blobServiceClient = new BlobServiceClient(connectionString);
        containerClient = blobServiceClient.GetBlobContainerClient("pile");
    }

    // Upload a file
    public async Task<string> UploadFileAsync(IFormFile file)
    {
        var blobClient = containerClient.GetBlobClient(file.FileName);
        using var stream = file.OpenReadStream();
        await blobClient.UploadAsync(stream, new BlobHttpHeaders { ContentType = file.ContentType });
        return blobClient.Uri.ToString();
    }

    // Delete a file
    public async Task DeleteFileAsync(string blobName)
    {
        BlobClient blobClient = containerClient.GetBlobClient(blobName);
        await blobClient.DeleteIfExistsAsync();
    }

    // Get blob URL
    public string GetBlobUrl(string blobName)
    {
        BlobClient blobClient = containerClient.GetBlobClient(blobName);
        return blobClient.Uri.AbsoluteUri;
    }

}