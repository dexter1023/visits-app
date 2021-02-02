using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Visits.Core.DatabaseContext;
using System.Collections.Generic;

namespace Visits.Models
{
    public class VisitMedicamentModel : BaseEntity
    {
        [Key]
        public int id { get; set; }

        public string name { get; set; }

        public string dose { get; set; }

        public string duration { get; set; }

        public virtual VisitModel visit { get; set; }

    }
}