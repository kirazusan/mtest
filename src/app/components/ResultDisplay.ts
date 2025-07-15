package app.components;

import { Component, Input } from '@angular/core';
import { CalculationResult } from '../models/calculation-result.model';

@Component({
  selector: 'app-result-display',
  templateUrl: './result-display.component.html'
})
export class ResultDisplayComponent {
  @Input() result: CalculationResult;

  constructor() {}

  get displayResult() {
    return this.result ? this.result.value : 'No result available';
  }
}