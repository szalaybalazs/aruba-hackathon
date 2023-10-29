namespace ArubaBackend.Models;

public class UserProfileDTO
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string ProfileImageUrl { get; set; }
    public string City { get; set; }
    public string Email { get; set; }
    public string? State { get; set; }
    
    public string StreetAddress { get; set; }

    public string ZipCode { get; set; }
    
    public string Country { get; set; }

}