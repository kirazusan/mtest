package src.app.components.MainPage;

import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: './MainPage.component.html'
})
export class MainPageComponent {
  constructor(private router: Router) {}

  navigateToCalculator() {
    this.router.navigate(['/calculator']);
  }
}