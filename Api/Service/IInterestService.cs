using Api.Schema;

namespace Api.Service;

public interface IInterestService
{
    public CalculateInterestResponse Calculate(CalculateInterestRequest request);
}