using ArubaBackend.Models;

namespace ArubaBackend;
using MongoDB.Driver;
using MongoDB.Bson;

public class MongoDBContext
{
    const string connectionUri = "mongodb+srv://bodnarbalazs:goqxyJ-8pohsu-zeptax@cluster0.mzbiucr.mongodb.net/ArubaMongo?retryWrites=true&w=majority";

    private MongoClientSettings MongoSettings { get; }
    private MongoClient MongoClient { get; }
    public IMongoCollection<User> Users => MongoClient.GetDatabase("ArubaMongo").GetCollection<User>("users");
    public IMongoCollection<ProductApp> WebApps => MongoClient.GetDatabase("ArubaMongo").GetCollection<ProductApp>("webApps");

    public MongoDBContext()
    {
        MongoSettings = MongoClientSettings.FromConnectionString(connectionUri);
        // Set the ServerApi field of the settings object to Stable API version 1
        MongoSettings.ServerApi = new ServerApi(ServerApiVersion.V1);
        // Create a new client and connect to the server
        MongoClient = new MongoClient(MongoSettings);
        // Send a ping to confirm a successful connection
    
    }

    public void AddUser(User user)
    {
        Users.InsertOne(user);
    }

    public User GetUserByEmail(string userEmail)
    {
        return Users.Find(user => user.Email == userEmail).FirstOrDefault();
    }

    public UserProfileDTO GetUserDetailsByEmail(string userEmail)
    {
        User user = Users.Find(user => user.Email == userEmail).FirstOrDefault();
        return new UserProfileDTO()
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            City = user.Address?.City,
            Country = user.Address?.Country,
            Email = user.Email,
            State = user.Address?.State,
            StreetAddress = user.Address?.StreetAddress,
            ZipCode = user.Address?.ZipCode,
            ProfileImageUrl = user.ProfileImageUrl
        };
    }

    public void DeleteUser(string id)
    {
        Users.DeleteOne(user => user.Id == id);
    }

    public void DeleteUserDB()
    {
        Users.DeleteMany(user => user.Role!=RoleType.Admin);
    }

    public void UpdateUser(UserProfileDTO userDto, string email)
    {
        // Define the filter
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);

        Address address = new Address()
        {
            City = userDto.City,
            Country = userDto.Country,
            State = userDto.State,
            StreetAddress = userDto.StreetAddress,
            ZipCode = userDto.ZipCode
        };

        // Check if user has an Address
        var user = Users.Find(filter).FirstOrDefault();
        UpdateDefinition<User> update;

        if (user != null && user.Address == null)
        {
            // If Address is null, set the whole Address field
            update = Builders<User>.Update
                .Set(u => u.FirstName, userDto.FirstName)
                .Set(u => u.LastName, userDto.LastName)
                .Set(u => u.Address, address);
        }
        else
        {
            // If Address exists, update the individual fields
            update = Builders<User>.Update
                .Set(u => u.FirstName, userDto.FirstName)
                .Set(u => u.LastName, userDto.LastName)
                .Set(u => u.Address.City, address.City)
                .Set(u => u.Address.Country, address.Country)
                .Set(u => u.Address.State, address.State)
                .Set(u => u.Address.StreetAddress, address.StreetAddress)
                .Set(u => u.Address.ZipCode, address.ZipCode);
        }

        // Use UpdateOne to update the user
        Users.UpdateOne(filter, update);
    }

    public void UpdateUserProfileImage(string email, string url)
    {
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);

        // Define the update (set the url)
        var update = Builders<User>.Update.Set(u => u.ProfileImageUrl, url);

        // Using upsert option to create the user if not exist
        var options = new UpdateOptions { IsUpsert = true };

        // Apply the update
        Users.UpdateOne(filter, update, options);
    }

    public void ChangePassword(PasswordChangeDTO loginDTO,string email)
    {
        // 1. Fetch the user by the provided email
        var filter = Builders<User>.Filter.Eq(u => u.Email, email);
        var user = Users.Find(filter).FirstOrDefault();

        // 2. If the user exists, compute the new password hash and update
        if (user != null)
        {
            string newHashedPassword = User.ComputeSha256Hash("SecretSalt" + loginDTO.newPassword);
            var update = Builders<User>.Update.Set(u => u.PasswordHash, newHashedPassword);
            Users.UpdateOne(filter, update);
        }
        
    }


    public void UploadWebApp(ProductAppDTO productAppDto)
    {
        var productApp = new ProductApp(
            productAppDto.Name,
            productAppDto.Price,
            productAppDto.AuthorId,
            productAppDto.DockerImageUrl,
            productAppDto.DockerContainerName, 
            productAppDto.BusinessTypes,
            productAppDto.Plugins,
            productAppDto.Description,
            productAppDto.DisplayImageUrl
        );
        WebApps.InsertOne(productApp);
    }

    public List<ProductApp> GetAllWebApps()
    {
        return WebApps.Find(a =>a.Name.Length>0).ToList();
    }

}