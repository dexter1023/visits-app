using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Visits.Core.DatabaseContext;
using System.Collections.Generic;

namespace Visits.Models
{
    public class UserModel : BaseEntity
    {
        public UserModel()
        {
            patients = new List<PatientModel>();
            visits = new List<VisitModel>();
        }

        [Key]
        public int id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string password { get; set; }

        public string passwordResetKey { get; set; }

        public virtual List<PatientModel> patients { get; set; }

        public virtual List<VisitModel> visits { get; set; }
    }
}
