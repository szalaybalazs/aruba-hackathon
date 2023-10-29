using ArubaBackend.Models;

namespace ArubaBackend;

using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

public class TokenAuth
{
    private readonly string _key;
    private readonly string _issuer;

    public TokenAuth(string key, string issuer)
    {
        _key = key;
        _issuer = issuer;
    }

    public string IssueToken(User user)
    {
        var claims = new[]
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.Role, user.Role.ToString())
        };

        var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_key));
        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _issuer,
            audience: _issuer,
            claims: claims,
            expires: DateTime.Now.AddHours(1), // Token validity. You can increase or decrease it based on your requirements.
            signingCredentials: creds);

        return new JwtSecurityTokenHandler().WriteToken(token);
    }
}
