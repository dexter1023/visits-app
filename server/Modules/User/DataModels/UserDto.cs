using System.ComponentModel.DataAnnotations;

namespace Visits.Modules.User
{
    public class UserDataUpdateDTO
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }
    }

    public class UserDataDTO
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        public string email { get; set; }
    }

    public class UserPassworUpdatedDTO
    {
        [Required]
        public string password { get; set; }
    }
}