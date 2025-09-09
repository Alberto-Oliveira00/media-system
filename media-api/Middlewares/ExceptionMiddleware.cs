using System.Net;
using System.Text.Json;
using Microsoft.AspNetCore.Http;
using System.Collections.Generic;

namespace media_api.Middlewares
{
    public class ExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public ExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext httpContext)
        {
            try
            {
                await _next(httpContext);
            }
            catch (Exception ex)
            {
                await HandleExceptionAsync(httpContext, ex);
            }
        }

        private Task HandleExceptionAsync(HttpContext context, Exception exception)
        {
            context.Response.ContentType = "application/json";
            context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

            var response = new
            {
                status = context.Response.StatusCode,
                message = "Ocorreu um erro interno no servidor."
            };

            switch (exception)
            {
                case KeyNotFoundException notFoundEx:
                    context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                    response = new { status = context.Response.StatusCode, message = notFoundEx.Message };
                    break;
                case ArgumentException argumentEx:
                    context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                    response = new { status = context.Response.StatusCode, message = argumentEx.Message };
                    break;
                default:
                    break;
            }

            var jsonResponse = JsonSerializer.Serialize(response);
            return context.Response.WriteAsync(jsonResponse);
        }
    }
}