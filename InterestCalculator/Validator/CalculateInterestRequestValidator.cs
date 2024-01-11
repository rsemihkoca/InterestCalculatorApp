using FluentValidation;
using InterestCalculator.Schema;

namespace InterestCalculator.Validator;

public class CalculateInterestRequestValidator : AbstractValidator<CalculateInterestRequest>
{
    public CalculateInterestRequestValidator()
    {
        {
            RuleFor(request => request.Yon)
                .NotEmpty().WithMessage("Yön alanı boş bırakılamaz.")
                .Must(yon => yon == "S" || yon == "C").WithMessage("Yön alanı basit veya bileşik olmalıdır.");

            RuleFor(request => request.Faizlendirme)
                .InclusiveBetween(0, 12).WithMessage("Faizlendirme alanı 0 ile 12 arasında olmalıdır.");

            RuleFor(request => request.FaizBirim)
                .InclusiveBetween(0, 12).WithMessage("Faiz vade alanı 0 ile 12 arasında olmalıdır.");

            RuleFor(request => request.FaizYuzde)
                .InclusiveBetween(0, 100).WithMessage("Faiz yüzde alanı 0 ile 100 arasında olmalıdır.");

            RuleFor(request => request.Anapara)
                .GreaterThan(0).WithMessage("Anapara alanı 0'dan büyük olmalıdır.");

            RuleFor(request => request.Vade)
                .GreaterThan(0).WithMessage("Vade alanı 0'dan büyük olmalıdır.");

            RuleFor(request => request.VadeBirim)
                .InclusiveBetween(0, 12).WithMessage("Vade birim alanı 0 ile 12 arasında olmalıdır.");
            
            RuleFor(request => request.VadeBirim)
                .Must(VadeBirimValid)
                .WithMessage("Vade birimi, faizlendirme sıklığından daha küçük olamaz. Lütfen geçerli bir vade birimi seçiniz.");
        }
    }

    private int ConvertToDays(int unit)
    {
        // if unit is 0 return 1 else return unit*30
        return unit == 0 ? 1 : unit * 30;
    }

    private bool VadeBirimValid(CalculateInterestRequest request, int vadeBirim)
    {
        return ConvertToDays(request.VadeBirim) > ConvertToDays(request.Faizlendirme);
    }
}