using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Visits.Core.DatabaseContext;
using System.Collections.Generic;

namespace Visits.Models
{
    public class PatientModel : BaseEntity
    {
        public PatientModel()
        {
            visits = new List<VisitModel>();
        }

        [Key]
        public int id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        [EmailAddress]
        public string email { get; set; }

        public string identityNumber { get; set; }

        public string phoneNumber { get; set; }

        public string street { get; set; }

        public string streetNumber { get; set; }

        public string postalCode { get; set; }

        public string city { get; set; }

        public string interview { get; set; }

        public int userId { get; set; }
        public virtual UserModel user { get; set; }

        public virtual List<VisitModel> visits { get; set; }

    }
}