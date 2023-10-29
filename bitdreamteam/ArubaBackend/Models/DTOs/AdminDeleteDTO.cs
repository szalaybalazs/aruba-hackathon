namespace ArubaBackend.Models;

public class AdminDeleteDTO
{ 
    public string EmailOfUserToBeDeleted { get; set; } 
    public string AdminEmail { get; set; }
    public string AdminPassword { get; set; }
}