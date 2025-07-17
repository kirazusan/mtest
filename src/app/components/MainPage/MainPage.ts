import { Component } from '@angular/core';

@Component({
  selector: 'app-main-page',
  templateUrl: './MainPage.html',
  styleUrls: ['./MainPage.css']
})
export class MainPageComponent {
  builder: any;
  calculationResult: number | null = null;
  errorMessage: string | null = null;
  calculatorState: { result: number | null; errorMessage: string | null } = { result: null, errorMessage: null };
  resetMessage: string | null = null;
  supportedOperations: Array<{ name: string; details: string }> = [];
  supportedOperators: string[] = [];

  static CreateMauiApp(): MauiApp {
    const builder = MauiApp.CreateBuilder();
    builder.UseMauiApp(App);
    builder.ConfigureFonts(fonts => {
      fonts.AddFont("OpenSans-Regular.ttf", "OpenSansRegular");
      fonts.AddFont("OpenSans-Semibold.ttf", "OpenSansSemibold");
    });
    return builder.Build();
  }

  Calculate({ num1, num2, operator }: { num1: number; num2: number; operator: string }): void {
    this.errorMessage = null;
    switch (operator) {
      case 'add':
        this.calculationResult = num1 + num2;
        break;
      case 'subtract':
        this.calculationResult = num1 - num2;
        break;
      case 'multiply':
        this.calculationResult = num1 * num2;
        break;
      case 'divide':
        if (num2 === 0) {
          this.errorMessage = "Division by zero is not allowed.";
          return;
        }
        this.calculationResult = num1 / num2;
        break;
      default:
        this.errorMessage = "Invalid operator.";
    }
  }

  ResetCalculator(): string {
    this.calculatorState.result = null;
    this.calculatorState.errorMessage = null;
    this.resetMessage = "Calculator has been reset.";
    return this.resetMessage;
  }

  async GetSupportedOperations(): Promise<void> {
    try {
      const response = await fetch('/api/supported-operations');
      this.supportedOperations = await response.json();
    } catch (error) {
      console.error(error);
    }
  }

  async GetSupportedOperators(): Promise<void> {
    try {
      const response = await fetch('/api/supported-operators');
      this.supportedOperators = await response.json();
    } catch (error) {
      console.error(error);
    }
  }
}