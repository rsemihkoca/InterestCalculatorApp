using InterestCalculator.Schema;

namespace InterestCalculator.Service;

public interface IInterestService
{
    public CalculateInterestResponse Calculate(CalculateInterestRequest request);
}