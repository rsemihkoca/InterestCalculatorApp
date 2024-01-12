using Api.Schema;

namespace Api.Service;

public class InterestService : IInterestService
{
    private int ConvertToDays(int unit)
    {
        // if unit is 0 return 1 else return unit*30
        return unit == 0 ? 1 : unit * 30;
    }

    public CalculateInterestResponse Calculate(CalculateInterestRequest request)
    {
        // validasyonlar kontrol et
        // Vade birimi faizlendirme sıklığından daha küçük olamaz. Lütfen geçerli bir vade birimi seçiniz.

        try
        {
            double faizTutar;
            double vadeSonuToplam;

            double faizOrani = (double)request.FaizYuzde / 100.0;
            double anapara = (double)request.Anapara;
            int vade = request.Vade;

            int vadeBirim = ConvertToDays(request.VadeBirim);
            int faizlendirme = ConvertToDays(request.Faizlendirme);
            int faizBirim = ConvertToDays(request.FaizBirim);

            double faizlendirmeVadeOrani = (double)vadeBirim / faizlendirme;
            double faizlendirmeFaizOrani = (double)faizlendirme / faizBirim;

            switch (request.Yon)
            {
                case "S": // Simple Interest

                    faizTutar = anapara * faizOrani * vade / (faizlendirmeVadeOrani * faizlendirmeFaizOrani);
                    vadeSonuToplam = anapara + faizTutar;
                    break;

                case "C": // Compound Interest

                    double d = vade * faizlendirmeVadeOrani;
                    double fPrime = faizOrani * faizlendirmeFaizOrani;
                    double k = 1 + fPrime;
                    faizTutar = anapara * Math.Pow(k, d) - anapara;
                    vadeSonuToplam = anapara + faizTutar;
                    break;

                default:
                    throw new ArgumentException("Invalid Yon value");
            }

            CalculateInterestResponse response = new CalculateInterestResponse
            {
                Anapara = anapara,
                FaizTutari = faizTutar,
                GetiriOrani = (faizTutar / anapara) * 100,
                VadeSonuToplam = vadeSonuToplam
            };
            
            return response;
        }
        catch (Exception ex)
        {
            throw new ApplicationException($"Hesaplama sırasında bir hata oluştu: {ex.Message}");
        }
    }
}