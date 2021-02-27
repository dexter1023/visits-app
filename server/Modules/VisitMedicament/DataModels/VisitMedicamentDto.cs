using System.ComponentModel.DataAnnotations;

namespace Visits.Modules.VisitMedicament
{
    public class VisitMedicamentRequestDto
    {
        [Required]
        public string name { get; set; }

        [Required]
        public string dose { get; set; }

        [Required]
        public string duration { get; set; }
    }

    public class VisitMedicamentResponseDto
    {
        public int id { get; set; }
        public string name { get; set; }

        public string dose { get; set; }

        public string duration { get; set; }
    }
}