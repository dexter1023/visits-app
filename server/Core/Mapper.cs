using AutoMapper;
using Visits.Modules.Patient;
using Visits.Modules.Visit;
using Visits.Models;
using Visits.Modules.VisitMeasurement;
using Visits.Modules.VisitMedicament;

namespace Visits.Core.AutoMapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<VisitModel, VisitListResponseDto>();
            CreateMap<VisitModel, VisitResponseDto>();
            CreateMap<PatientModel, PatientListDto>();
            CreateMap<CreatePatientRequestDto, PatientModel>();
            CreateMap<PatientModel, PatientVisitResponseDto>();
            CreateMap<PatientModel, PatientDetailsResponseDto>();
            CreateMap<VisitModel, VisitPatientResponseDto>();
            CreateMap<VisitMeasurementModel, VisitMeasurementResponseDto>();
            CreateMap<VisitMeasurementRequestDto, VisitMeasurementModel>();
            CreateMap<VisitMedicamentModel, VisitMedicamentResponseDto>();
            CreateMap<VisitMedicamentRequestDto, VisitMedicamentModel>();

        }
    }
}