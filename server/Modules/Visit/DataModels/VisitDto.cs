using System;
using System.ComponentModel.DataAnnotations;
using Visits.Modules.VisitMeasurement;
using Visits.Modules.VisitMedicament;
using Visits.Modules.Patient;
using System.Collections.Generic;

namespace Visits.Modules.Visit
{
    public class CreateVisitRequestDto
    {
        [Required]
        public string visitDate { get; set; }

        [Required]
        public int patientId { get; set; }
    }

    public class ExecutedVisitRequestDto
    {
        [Required]
        public int id { get; set; }

        [Required]
        public string description { get; set; }

        [Required]
        public string recommendations { get; set; }

        [Required]
        public List<VisitMeasurementRequestDto> measurements { get; set; }

        [Required]
        public List<VisitMedicamentRequestDto> medicaments { get; set; }
    }

    public class VisitListResponseDto
    {
        public int id { get; set; }

        public DateTime visitDate { get; set; }

        public PatientVisitResponseDto patient { get; set; }
    }

    public class VisitResponseDto
    {
        public int id { get; set; }

        public DateTime visitDate { get; set; }

        public DateTime visitDateStart { get; set; }

        public DateTime visitDateEnd { get; set; }

        public bool isCompleted { get; set; } = false;

        public string description { get; set; }

        public string recommendations { get; set; }

        public PatientDetailsResponseDto patient { get; set; }

        public List<VisitMeasurementResponseDto> measurements { get; set; }

        public List<VisitMedicamentResponseDto> medicaments { get; set; }
    }

    public class VisitPatientResponseDto
    {
        public int id { get; set; }

        public DateTime visitDate { get; set; }

        public DateTime visitDateStart { get; set; }

        public DateTime visitDateEnd { get; set; }

        public bool isCompleted { get; set; } = false;

        public string description { get; set; }

        public string recommendations { get; set; }

        public List<VisitMeasurementResponseDto> measurements { get; set; }

        public List<VisitMedicamentResponseDto> medicaments { get; set; }
    }

    public class VisitQueryDto
    {
        public string date { get; set; }
    }
}