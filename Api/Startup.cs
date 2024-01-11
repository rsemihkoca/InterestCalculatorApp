using FluentValidation;
using FluentValidation.AspNetCore;
using InterestCalculator.Middleware;
using InterestCalculator.Schema;
using InterestCalculator.Service;
using InterestCalculator.Validator;

namespace InterestCalculator;

public class Startup
{
    public IConfiguration Configuration;

    public Startup(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    public void ConfigureServices(IServiceCollection services)
    {

        services.AddScoped<IInterestService, InterestService>();
        services.AddControllers();
        services.AddFluentValidationAutoValidation();
        services.AddScoped<IValidator<CalculateInterestRequest>, CalculateInterestRequestValidator>();

        services.AddEndpointsApiExplorer();
        services.AddSwaggerGen();
    }
    
    public void Configure(IApplicationBuilder app,IWebHostEnvironment env)
    {
        if (env.IsDevelopment())
        {
            app.UseDeveloperExceptionPage();
            app.UseSwagger();
            app.UseSwaggerUI();
        }

        app.UseMiddleware<GlobalExceptionHandlerMiddleware>();
        
        app.UseDefaultFiles();
        app.UseStaticFiles();
        // app.UseHttpsRedirection();

        app.UseRouting();
        app.UseAuthorization();

        app.UseEndpoints(endpoints =>
        {
            endpoints.MapControllerRoute(
                name: "default",
                pattern: "{controller=Home}/{action=Index}/{id?}");
        });
    }
}