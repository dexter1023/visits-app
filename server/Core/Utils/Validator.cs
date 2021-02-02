using System.ComponentModel.DataAnnotations;

namespace Visits.Core.Utils
{
    static class Validator
    {
        public static bool isEmail(string email)
        {
            var attribute = new EmailAddressAttribute();
            return attribute.IsValid(email);
        }
    }
}