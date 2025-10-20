using MillionProperty.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddFluentValidationAutoValidation();

builder.Services.AddValidatorsFromAssemblyContaining<GetFilteredPropertiesQueryValidator>();

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDbSettings"));


builder.Services.AddSingleton<IPropertyRepository>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();
    return new PropertyRepository(settings);
});

builder.Services.AddSingleton<IPropertyImageRepository>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();
    return new PropertyImageRepository(settings);
});

builder.Services.AddSingleton<IOwnerRepository>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();
    return new OwnerRepository(settings);
});

builder.Services.AddSingleton<IPropertyTraceRepository>(sp =>
{
    var settings = sp.GetRequiredService<IOptions<MongoDbSettings>>();
    return new PropertyTraceRepository(settings);
});

var MyAllowSpecificOrigins = "_myAllowSpecificOrigins";

var corsOrigins = builder.Configuration.GetValue<string>("CorsSettings:AllowedOrigins") 
    ?? "http://localhost:3000";

var allowedOrigins = corsOrigins.Split(',', StringSplitOptions.RemoveEmptyEntries)
    .Select(o => o.Trim())
    .ToArray();

builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy  =>
                      {
                          policy.WithOrigins(allowedOrigins) 
                                .AllowAnyHeader()
                                .AllowAnyMethod();
                      });
});


builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(MappingProfile).Assembly));

builder.Services.AddAutoMapper(typeof(MappingProfile));


builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

app.UseMiddleware<GlobalExceptionHandler>();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors(MyAllowSpecificOrigins);
app.UseAuthorization();
app.MapControllers();

if (app.Environment.IsDevelopment())
{
    using var scope = app.Services.CreateScope();
    var settings = scope.ServiceProvider.GetRequiredService<IOptions<MongoDbSettings>>().Value;
    var client = new MongoClient(settings.ConnectionString);
    var database = client.GetDatabase(settings.DatabaseName);
    await MongoDbSeeder.SeedDataAsync(database);
}

app.Run();