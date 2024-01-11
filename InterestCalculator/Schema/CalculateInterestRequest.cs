namespace InterestCalculator.Schema;

public record CalculateInterestRequest(

    string Yon,// "S" or "C" compound or simple
    int Faizlendirme,// 0, 1, 3, 6, 12
    int FaizBirim,// 0, 1, 12
    decimal FaizYuzde,// e.g., 10.75
    decimal Anapara,// e.g., 12500.50
    int Vade,// e.g., 15
    int VadeBirim// 0, 1, 12
);