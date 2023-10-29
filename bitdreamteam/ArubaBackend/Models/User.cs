using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata.Ecma335;
using System.Security.Cryptography;
using System.Text;

namespace ArubaBackend.Models;

public class User
{
    public string? Id { get; set; }

    [Required(ErrorMessage = "First name is required.")]
    public string FirstName { get; set; }

    [Required(ErrorMessage = "Last name is required.")]
    public string LastName { get; set; }

    public string PasswordHash { get; set; }
    public string? ProfileImageUrl { get; set; }

    [Required(ErrorMessage = "Email is required.")]
    [EmailAddress(ErrorMessage = "Invalid email address.")]
    public string Email { get; set; }
    
    public Address? Address { get; set; }
    public string UserImageCDN { get; set; }
    public RoleType Role { get; set; }

    private static readonly string Salt = "SecretSalt"; 
    
    
    public User(string id, string firstName, string lastName, string passwordHash, string email, RoleType role)
    {
        this.Id = id;
        this.FirstName = firstName;
        this.LastName = lastName;
        this.PasswordHash = passwordHash;
        this.Email = email;
        this.Role = role;
    }
    public User(string firstName, string lastName, string password, string email, RoleType role=RoleType.User)
    {
        this.FirstName = firstName;
        this.LastName = lastName;
        this.PasswordHash = ComputeSha256Hash(Salt + password);
        this.Email = email;
        this.Id = Guid.NewGuid().ToString();
        this.Role = role;
    }

    public User(UserDTO userDto) : this(userDto.FirstName, userDto.LastName, userDto.Password, userDto.Email)
    {
        
    }

    public bool IsMatchingPassword(string password)
    {
        string hashedInputPassword = ComputeSha256Hash(Salt + password);
        return hashedInputPassword == PasswordHash;
    }

    public static string ComputeSha256Hash(string rawData)
    {
        using (SHA256 sha256Hash = SHA256.Create())
        {
            byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawData));
            StringBuilder builder = new StringBuilder();
            for (int i = 0; i < bytes.Length; i++)
            {
                builder.Append(bytes[i].ToString("x2"));
            }
            return builder.ToString();
        }
    }
}

public enum RoleType
{
    User,
    Admin,
    Seller
}