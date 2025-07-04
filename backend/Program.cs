package backend;

using Microsoft.Maui.Controls;
using Microsoft.Maui.Hosting;

public class Program
{
    public static void Main(string[] args)
    {
        CreateMauiApp().Run(args);
    }

    public static MauiApp CreateMauiApp()
    {
        return MauiApp.CreateBuilder()
            .UseMauiApp<App>()
            .Build();
    }
}