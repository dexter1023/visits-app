using System;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using Visits.Services;
using Visits.Models;
using Visits.Core.Authentication;
using Visits.Modules.Patient;

namespace Visits.Controllers
{
    [Authorize]
    [Route("api/patients")]
    [ApiController]
    public class PatientsController : AbstractBaseController
    {
        private readonly PatientService patientService;

        public PatientsController(PatientService _patientService)
        {
            patientService = _patientService;
        }

        [HttpGet]
        public async Task<IActionResult> GetPatients([FromQuery] PatientQueryDto query)
        {
            return Ok(await patientService.GetPatientsList(GetUserId(), query));
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetPatientDetails([FromRoute] int id)
        {
            return Ok(await patientService.GetPatientDetails(GetUserId(), id));
        }

        [HttpPost]
        public async Task<IActionResult> CreatePatient([FromBody] CreatePatientRequestDto patient)
        {
            await patientService.CreatePatient(GetUserId(), patient);
            return Ok();
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePatiet([FromBody] UpdatePatientRequestDto patient, [FromRoute] int id)
        {
            await patientService.UpdatePatient(id, GetUserId(), patient);
            return Ok();
        }

    }
}