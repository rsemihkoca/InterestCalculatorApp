using System.Text.Json.Serialization;

namespace Api.Schema;

public class CalculateInterestResponse
{
    public double Anapara { get; set; }

    [JsonPropertyName("Faiz Tutarı")] public double FaizTutari { get; set; }

    [JsonPropertyName("Getiri Oranı")] public double GetiriOrani { get; set; }

    [JsonPropertyName("Vade Sonu Toplam")] public double VadeSonuToplam { get; set; }

    public override string ToString()
    {
        return $"Anapara: {Anapara:F2},\n" +
               $"Faiz Tutarı: {FaizTutari:F2},\n" +
               $"Getiri Oranı: %{GetiriOrani:F2},\n" +
               $"Vade Sonu Toplam: {VadeSonuToplam:F2}";
    }
}