using InterestCalculator.Schema;
using InterestCalculator.Service;
using Microsoft.AspNetCore.Mvc;

namespace InterestCalculator;

[ApiController]
[Route("api/[controller]")]
public class InterestController(IInterestService interestService) : ControllerBase
{

    private readonly IInterestService _interestService = interestService;
    
    [HttpGet("GetInterestRates")]
    public IActionResult GetInterestRates()
    {
        return Ok("Hi");
    }

    [HttpPost("Calculate")]
    public ActionResult<CalculateInterestResponse> Calculate([FromForm] CalculateInterestRequest request)
    {
        Console.WriteLine(request);
        CalculateInterestResponse response = _interestService.Calculate(request);
        Console.WriteLine(response);
        return response;
    }
    
}