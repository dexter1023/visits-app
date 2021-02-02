using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Visits.Core.DatabaseContext;
using System.Collections.Generic;

namespace Visits.Models
{
    public class VisitModel : BaseEntity
    {
        public VisitModel()
        {
            measurements = new List<VisitMeasurementModel>();
            medicaments = new List<VisitMedicamentModel>();
        }

        [Key]
        public int id { get; set; }

        public DateTime visitDate { get; set; }

        public DateTime visitDateStart { get; set; }

        public DateTime visitDateEnd { get; set; }

        public bool isCompleted { get; set; } = false;

        public string description { get; set; }

        public string recommendations { get; set; }

        public int userId { get; set; }
        public virtual UserModel user { get; set; }

        public int patientId { get; set; }
        public virtual PatientModel patient { get; set; }

        public virtual List<VisitMeasurementModel> measurements { get; set; }

        public virtual List<VisitMedicamentModel> medicaments { get; set; }
    }
}