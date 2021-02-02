using System;
using System.Linq;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Visits.Core.DatabaseContext;
using System.Threading.Tasks;
using Visits.Modules.Visit;
using Visits.Core.Utils;
using Visits.Models;
using AutoMapper;

namespace Visits.Services
{
    public class VisitService
    {
        VisitsDbContext context;
        IMapper mapper;

        public VisitService(VisitsDbContext _context, IMapper _mapper)
        {
            context = _context;
            mapper = _mapper;
        }

        public async Task<List<VisitListResponseDto>> GetUserVisitsList(int userId, VisitQueryDto query)
        {
            var visits = await GetVisitsByDate(userId, query.date);
            List<VisitListResponseDto> list = mapper.Map<List<VisitListResponseDto>>(visits);
            return list;
        }

        public async Task<VisitResponseDto> GetAndStartVisit(int userId, int visitId)
        {
            var visit = await GetVisitById(userId, visitId);
            visit.visitDateStart = DateTime.UtcNow;
            await context.SaveChangesAsync();
            var response = mapper.Map<VisitResponseDto>(visit);
            return response;
        }

        public async Task FinishVisit(int userId, ExecutedVisitRequestDto visit)
        {
            var visitModel = await GetVisitById(userId, visit.id);
            if (visitModel == null)
            {
                throw new ArgumentOutOfRangeException("There is no visit");
            }
            else
            {
                visitModel.visitDateEnd = DateTime.UtcNow;
                context.Entry(visitModel).CurrentValues.SetValues(visit);
                await context.SaveChangesAsync();
            }
        }

        async Task<VisitModel> GetVisitById(int userId, int visitId)
        {
            var visit = await context
                .Visits
                .Where(v => v.userId == userId)
                .Where(v => v.id == visitId)
                .FirstOrDefaultAsync();
            return visit;
        }

        public async Task CreateVisit(int userId, CreateVisitRequestDto visit)
        {
            string[] dateFormats = { "yyyy-MM-dd", "dd-MM-yyyy", "dd/MM/yyyy" };
            if (DateUtils.ValidateDate(visit.visitDate, dateFormats))
            {
                var visitModel = new VisitModel
                {
                    visitDate = DateTime.Parse(visit.visitDate),
                    patientId = visit.patientId,
                    userId = userId
                };

                context.Visits.Add(visitModel);
                await context.SaveChangesAsync();
            }
            else throw new ArgumentOutOfRangeException("Bad format Date");
        }



        async Task<List<VisitModel>> GetVisitsByDate(int userId, string date)
        {
            string[] dateFormats = { "yyyy-MM-dd", "dd-MM-yyyy", "dd/MM/yyyy" };
            if (DateUtils.ValidateDate(date, dateFormats))
            {
                var from = DateTime.Parse(date);
                var to = DateTime.Parse(date).AddDays(1);
                var visits = await context
                    .Visits
                    .Where(v => v.visitDate > from)
                    .Where(v => v.visitDate <= to)
                    .Where(v => v.userId == userId)
                    .Include(v => v.patient)
                    .ToListAsync();
                return visits;
            }
            throw new ArgumentOutOfRangeException("Bad date format");
        }
    }
}