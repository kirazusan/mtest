package src.app.components;

import { Component } from '@angular/core';
import { CalculatorService } from '../services/calculator.service';

@Component({
  selector: 'app-calculator',
  templateUrl: './calculator.component.html'
})
export class CalculatorComponent {
  private readonly ERROR_MESSAGE: string = 'An error occurred: ';
  private readonly ADDITION: string = 'addition';
  private readonly SUBTRACTION: string = 'subtraction';
  private readonly MULTIPLICATION: string = 'multiplication';
  private readonly DIVISION: string = 'division';

  constructor(private calculatorService: CalculatorService) {}

  calculate(type: string, num1: number, num2: number): number | string {
    if (isNaN(num1) || isNaN(num2)) {
      return this.ERROR_MESSAGE + 'Invalid input. Please enter numbers.';
    }
    if (type === this.DIVISION && num2 === 0) {
      return this.ERROR_MESSAGE + 'Division by zero is not allowed.';
    }
    try {
      switch (type) {
        case this.ADDITION:
          return this.calculatorService.add(num1, num2);
        case this.SUBTRACTION:
          return this.calculatorService.subtract(num1, num2);
        case this.MULTIPLICATION:
          return this.calculatorService.multiply(num1, num2);
        case this.DIVISION:
          return this.calculatorService.divide(num1, num2);
        default:
          return this.ERROR_MESSAGE + 'Unknown calculation type.';
      }
    } catch (error) {
      return this.ERROR_MESSAGE + error.message;
    }
  }
}