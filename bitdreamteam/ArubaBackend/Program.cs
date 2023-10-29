using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Microsoft.Extensions.Logging;



var builder = WebApplication.CreateBuilder(args);

//builder.WebHost.UseUrls("http://*:80");
var logger = builder.Services.BuildServiceProvider().GetRequiredService<ILogger<Program>>();
// Add services to the container.
builder.Services.AddControllers();

//builder.WebHost.UseUrls("http://*:420");

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,

            ValidIssuer = "ArubaWeby",  // same as in TokenAuth
            ValidAudience = "ArubaWeby", // same as in TokenAuth
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ArubaWeby -this is a padding to be long enough...")) // same as in TokenAuth
        };
        options.Events = new JwtBearerEvents
        {
            OnAuthenticationFailed = context =>
            {
                logger.LogError($"Authentication failed. Exception: {context.Exception.Message}");
                return Task.CompletedTask;
            },
            OnChallenge = context =>
            {
            logger.LogWarning($"Challenge invoked. Reason: {context.AuthenticateFailure?.Message ?? "Unknown reason"}");
            return Task.CompletedTask;
        }
        };

    });


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new() { Title = "My API", Version = "v1" });

    // Add security definition and reference to Swagger
    c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Description = "JWT Authorization header using the Bearer scheme (Example: 'Bearer 12345abcdef')",
        Name = "Authorization",
        In = ParameterLocation.Header,
        Type = SecuritySchemeType.ApiKey,
        Scheme = "Bearer"
    });

    c.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                },
                Scheme = "oauth2",
                Name = "Bearer",
                In = ParameterLocation.Header
            },
            new List<string>()
        }
    });
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
app.Use(async (context, next) =>
{
    if (context.Request.Path == "/")
    {
        context.Response.Redirect("index.html");
        return;
    }
    await next();
});
app.UseStaticFiles();

//app.UseHttpsRedirection();
app.UseAuthentication(); // Add this line to use authentication
app.UseAuthorization();

app.MapControllers();

app.Run();