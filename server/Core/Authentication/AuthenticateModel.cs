using System.ComponentModel.DataAnnotations;
using Visits.Models;

namespace Visits.Core.Authentication
{
    public class AuthenticateModel
    {
        [Required]
        public string Username { get; set; }
        [Required]
        public string Password { get; set; }
    }

    public class UserPayload
    {
        public UserPayload(string _token, UserModel _user)
        {
            Token = _token;
            Id = _user.id;
            Email = _user.email;
            FirstName = _user.firstName;
            LastName = _user.lastName;
        }
        public string Token { get; set; }
        public int Id { get; set; }
        public string Email { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
    }
}