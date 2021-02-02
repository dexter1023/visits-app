using System.ComponentModel.DataAnnotations;

namespace Visits.Modules.VisitMeasurement
{
    public class VisitMeasurementRequestDto
    {
        [Required]
        public string name { get; set; }

        [Required]
        public string value { get; set; }
    }

    public class VisitMeasurementResponseDto
    {
        public int id { get; set; }
        public string name { get; set; }
        public string value { get; set; }
    }
}