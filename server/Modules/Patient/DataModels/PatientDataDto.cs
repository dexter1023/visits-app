using System.ComponentModel.DataAnnotations;
using Visits.Modules.Visit;
using System.Collections.Generic;

namespace Visits.Modules.Patient
{
    public class CreatePatientRequestDto
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string identityNumber { get; set; }

        [Required]
        public string phoneNumber { get; set; }

        [Required]
        public string street { get; set; }

        [Required]
        public string streetNumber { get; set; }

        [Required]
        public string postalCode { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string interview { get; set; }
    }

    public class UpdatePatientRequestDto
    {
        [Required]
        public string firstName { get; set; }

        [Required]
        public string lastName { get; set; }

        [Required]
        [EmailAddress]
        public string email { get; set; }

        [Required]
        public string identityNumber { get; set; }

        [Required]
        public string phoneNumber { get; set; }

        [Required]
        public string street { get; set; }

        [Required]
        public string streetNumber { get; set; }

        [Required]
        public string postalCode { get; set; }

        [Required]
        public string city { get; set; }

        [Required]
        public string interview { get; set; }
    }

    public class PatientVisitResponseDto
    {
        public int id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string identityNumber { get; set; }

        public string phoneNumber { get; set; }

        public string interview { get; set; }
    }

    public class PatientListDto
    {
        public int id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string identityNumber { get; set; }

        public string phoneNumber { get; set; }
    }

    public class PatientDetailsResponseDto
    {
        public int id { get; set; }

        public string firstName { get; set; }

        public string lastName { get; set; }

        public string email { get; set; }

        public string identityNumber { get; set; }

        public string phoneNumber { get; set; }

        public string street { get; set; }

        public string streetNumber { get; set; }

        public string postalCode { get; set; }

        public string city { get; set; }

        public string interview { get; set; }

        public List<VisitPatientResponseDto> visits { get; set; }
    }

    public class PatientQueryDto
    {
        public string search { get; set; }
    }
}