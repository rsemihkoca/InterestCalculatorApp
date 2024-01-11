using InterestCalculator;

namespace InterestCalculator;

public class Program
{
    public static void Main(string[] args)
    {
        Host.CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(builder =>
            {
                builder.UseStartup<Startup>();
                // builder.UseUrls("http://localhost:5001/");
            }).Build().Run();
    }
}