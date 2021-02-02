using System.Collections.Generic;
using System.Linq;
using Visits.Core.DatabaseContext;
using Visits.Core.Authentication;
using Visits.Models;
using Microsoft.Extensions.Configuration;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System;
using Visits.Core.Services;
using Visits.Modules.User;

namespace Visits.Services
{
    public class UserService
    {
        VisitsDbContext context;
        IConfiguration Configuration;
        Random random;
        public UserService(VisitsDbContext _context, IConfiguration configuration)
        {
            context = _context;
            Configuration = configuration;
            random = new Random();
        }

        public string HashPassword(string password)
        {
            var salt = BCrypt.Net.BCrypt.GenerateSalt(10);
            return BCrypt.Net.BCrypt.HashPassword(password, salt);
        }

        public List<UserModel> GetUsers()
        {
            return context.Users.ToList();
        }

        public UserModel GetUserByEmail(string email)
        {
            return context.Users.FirstOrDefault(u => u.email == email);
        }

        public bool SaveUser(UserModel user)
        {
            var isUser = GetUserByEmail(user.email);
            user.password = HashPassword(user.password);
            if (isUser == null)
            {
                context.Users.Add(user);
                context.SaveChanges();
                return true;
            }
            return false;
        }

        public UserPayload Authenticate(string username, string password)
        {
            UserModel user = context.Users.Single(user => user.email == username);
            if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var secret = Configuration["Jwt:Secret"];
            var byteSecret = Encoding.ASCII.GetBytes(secret);
            SecurityTokenDescriptor tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Email, user.email.ToString()),
                    new Claim(ClaimTypes.Name, user.id.ToString()),
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(byteSecret), SecurityAlgorithms.HmacSha256Signature)
            };
            SecurityToken preparedToken = tokenHandler.CreateToken(tokenDescriptor);
            string token = tokenHandler.WriteToken(preparedToken);
            user.password = null;
            UserPayload payload = new UserPayload(token, user);
            return payload;
        }

        public void GeneratePasswordResetKey(string email)
        {
            var user = GetUserByEmail(email);
            if (user == null)
            {
                throw new ArgumentException("Nie ma użytkownika o takim mailu");
            }
            else
            {
                var code = GenerateCode();
                var hash = HashPassword(code);
                user.passwordResetKey = hash;
                context.SaveChanges();
                var mailer = new MailerService();
                var domain = Configuration["ApplicationLink"];
                string subject = "Kod potrzebny do resetu hasła";
                string text = $"Twój kod do resetu hasła to {code}. Możesz wejść również pod link {domain}/password-reset/{code}?email={email}";
                mailer.SendMail(email, subject, text);
            }
        }

        public void ChangePassword(string email, string key, string password)
        {
            var user = context.Users.FirstOrDefault(u => u.email == email);
            if (user == null)
            {
                throw new ArgumentException("Nie znaleziono użytkownika");
            }
            else if (BCrypt.Net.BCrypt.Verify(key, user.passwordResetKey))
            {
                user.password = HashPassword(user.password);
                user.passwordResetKey = null;
                context.SaveChanges();
            }
            else
            {
                throw new ArgumentException("Błędny kod zmiany hasła");
            }
        }

        private string GenerateCode()
        {
            const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
            return new string(Enumerable.Repeat(chars, 16)
            .Select(s => s[random.Next(s.Length)]).ToArray());
        }

        public UserDataDTO GetUserById(int id)
        {
            var user = context.Users.FirstOrDefault(u => u.id == id);
            return new UserDataDTO { firstName = user.firstName, lastName = user.lastName, email = user.email };
        }

        public UserModel GetUserModelById(int id)
        {
            var user = context.Users.Where(u => u.id == id).FirstOrDefault();
            return user;
        }

        public UserDataDTO UpdateUser(int id, UserDataUpdateDTO payload)
        {
            if (payload == null)
            {
                throw new ArgumentOutOfRangeException("Złe dane użytkownika");
            }
            UserModel user = context.Users.Where(c => c.id == id).FirstOrDefault();

            if (user == null)
            {
                throw new Exception("Nie ma takiego użytkownika");
            }

            context.Entry(user).CurrentValues.SetValues(payload);
            context.SaveChanges();
            return GetUserById(id);
        }

        public UserDataDTO UpdateUserPassword(int id, UserPassworUpdatedDTO payload)
        {
            if (payload == null)
            {
                throw new ArgumentOutOfRangeException("Złe dane użytkownika");
            }
            UserModel user = context.Users.Where(c => c.id == id).FirstOrDefault();
            payload.password = HashPassword(payload.password);
            if (user == null)
            {
                throw new Exception("Nie ma takiego użytkownika");
            }

            context.Entry(user).CurrentValues.SetValues(payload);
            context.SaveChanges();
            return GetUserById(id);
        }
    }
}
