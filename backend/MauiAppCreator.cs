

using Microsoft.Maui.Controls;

namespace Microsoft.Maui
{
    public class MauiAppCreator : MauiWinUIApplication
    {
        protected override MauiApp CreateMauiApp()
        {
            return MauiProgram.CreateMauiApp();
        }
    }
}