using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Visits.Services;
using Visits.Models;
using Visits.Core.Authentication;
using Visits.Modules.Visit;

namespace Visits.Controllers
{
    [Authorize]
    [Route("api/visits")]
    [ApiController]
    public class VisitsController : AbstractBaseController
    {
        private readonly VisitService visitService;

        public VisitsController(VisitService _visitService)
        {
            visitService = _visitService;
        }

        [HttpGet]
        public async Task<IActionResult> GetVisits([FromQuery] VisitQueryDto query)
        {
            return Ok(await visitService.GetUserVisitsList(GetUserId(), query));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetVisit([FromRoute] int id)
        {
            return Ok(await visitService.GetAndStartVisit(GetUserId(), id));
        }

        [HttpPost]
        public async Task<IActionResult> SaveVisit([FromBody] CreateVisitRequestDto visit)
        {
            await visitService.CreateVisit(GetUserId(), visit);
            return Ok();
        }

        [HttpPost("finish")]
        public async Task<IActionResult> FinishVisit([FromBody] ExecutedVisitRequestDto visit)
        {
            await visitService.FinishVisit(GetUserId(), visit);
            return Ok();
        }

    }
}