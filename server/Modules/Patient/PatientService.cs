using System.Collections.Generic;
using System.Linq;
using Microsoft.EntityFrameworkCore;
using Visits.Models;
using System;
using Visits.Core.Services;
using System.Threading.Tasks;
using Visits.Core.DatabaseContext;
using Visits.Modules.Patient;
using AutoMapper;

namespace Visits.Services
{
    public class PatientService
    {
        VisitsDbContext context;
        IMapper mapper;

        public PatientService(VisitsDbContext _context, IMapper _mapper)
        {
            context = _context;
            mapper = _mapper;
        }

        public async Task<List<PatientListDto>> GetPatientsList(int userId, PatientQueryDto query)
        {
            var patients = await GetPatientsFromQuery(userId, query);
            var response = mapper.Map<List<PatientListDto>>(patients);
            return response;
        }

        private async Task<List<PatientModel>> GetPatientsFromQuery(int userId, PatientQueryDto query)
        {
            return await context
                .Patients
                .Where(p =>
                    p.firstName.Contains(query.search) ||
                    p.lastName.Contains(query.search) ||
                    p.email.Contains(query.search) ||
                    p.identityNumber.Contains(query.search))
                .Where(p => p.userId == userId)
                .ToListAsync();
        }

        public async Task<PatientDetailsResponseDto> GetPatientDetails(int userId, int patientId)
        {
            var patient = await context
                .Patients
                .Where(p => p.userId == userId)
                .Where(p => p.id == patientId)
                .Include(p => p.visits)
                .ThenInclude(v => v.measurements)
                .Include(p => p.visits)
                .ThenInclude(v => v.medicaments)
                .ToListAsync();
            var response = mapper.Map<PatientDetailsResponseDto>(patient);
            return response;
        }

        public async Task CreatePatient(int userId, CreatePatientRequestDto patient)
        {
            var model = new PatientModel();
            var patientModel = mapper.Map<CreatePatientRequestDto, PatientModel>(patient, model);
            patientModel.userId = userId;
            context.Patients.Add(patientModel);
            await context.SaveChangesAsync();
        }

        public async Task UpdatePatient(int patientId, int userId, UpdatePatientRequestDto patient)
        {
            var patientModel = await context
                .Patients
                .Where(p => p.id == patientId)
                .Where(p => p.userId == userId)
                .FirstOrDefaultAsync();
            if (patient == null)
            {
                throw new ArgumentOutOfRangeException("There is no patient");
            }
            else
            {
                context.Entry(patientModel).CurrentValues.SetValues(patient);
                await context.SaveChangesAsync();
            }
        }
    }
}