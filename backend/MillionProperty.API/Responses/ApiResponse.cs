namespace MillionProperty.API.Responses;

public class ApiResponse<T>
{
    public bool Success { get; set; }
    public string Message { get; set; }
    public T? Content { get; set; }

    public ApiResponse(T content, string message = "Success")
    {
        Success = true;
        Message = message;
        Content = content;
    }

    public ApiResponse(string errorMessage)
    {
        Success = false;
        Message = errorMessage;
        Content = default;
    }
}