using System.ComponentModel.DataAnnotations;
using Visits.Core.DatabaseContext;

namespace Visits.Models
{
    public class VisitMeasurementModel : BaseEntity
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string value { get; set; }

        public virtual VisitModel visit { get; set; }
    }
}