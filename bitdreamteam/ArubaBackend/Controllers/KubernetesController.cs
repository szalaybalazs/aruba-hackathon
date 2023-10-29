using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ArubaBackend.Controllers
{
    [ApiController]
    [Route("kubernetes")]
    public class KubernetesController : ControllerBase
    {
        [Authorize]
        [HttpPost("DeployUserApp")]
        public async Task<IActionResult> DeployUserApp ()
         {
             try
             {
                 KubernetesService kubernetesService = new KubernetesService();
                 Task<bool> isSuccessful = kubernetesService.DeployApplication("test", "test", "balazsbodnar/arubabackend:latest", 1, 4200);
                 bool result = await isSuccessful;

                 if (result)
                 {
                     return Ok();
                 }
                 else
                 {
                     return BadRequest();
                 }

                 
             }
             catch (Exception e)
             {
                 Console.WriteLine(e);
                 throw;
             }
             
             //return BadRequest("App could not be deployed successfully");
        }
        
        
    }
}

 