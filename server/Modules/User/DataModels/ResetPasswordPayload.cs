namespace Visits.Modules.User
{
    public class ResetPasswordPayload
    {
        public string email { get; set; }
        public string key { get; set; }
        public string password { get; set; }
    }
}