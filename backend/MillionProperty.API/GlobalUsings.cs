
global using MongoDB.Bson;
global using MongoDB.Driver;
global using Microsoft.AspNetCore.Mvc;
global using Microsoft.Extensions.Options;
global using MediatR;
global using FluentValidation;
global using FluentValidation.AspNetCore;

global using MillionProperty.Application.Features.Properties.Queries;
global using MillionProperty.Application.Features.Properties.Validators;
global using MillionProperty.Domain.Interfaces;
global using MillionProperty.Infrastructure.Repositories;
global using MillionProperty.Infrastructure.Data;

global using  MillionProperty.API.Responses;
global using MillionProperty.API.Middleware;
global using MillionProperty.Application.Mappings;