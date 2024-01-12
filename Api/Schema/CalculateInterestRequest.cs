using System.ComponentModel;
using System.Diagnostics.CodeAnalysis;

namespace Api.Schema;

public record CalculateInterestRequest(
    [property: DisplayName("Yön")]
    string Yon,// "S" or "C" compound or simple
    [property: DisplayName("Faizlendirme")]
    int Faizlendirme,// 0, 1, 3, 6, 12
    [property: DisplayName("Faiz Birim")]
    int FaizBirim,// 0, 1, 12
    [property: DisplayName("Faiz Yüzde")]
    decimal FaizYuzde,// e.g., 10.75
    [property: DisplayName("Anapara")]
    decimal Anapara,// e.g., 12500.50
    [property: DisplayName("Vade")]
    int Vade,// e.g., 15
    [property: DisplayName("Vade Birim")]
    int VadeBirim// 0, 1, 12
);