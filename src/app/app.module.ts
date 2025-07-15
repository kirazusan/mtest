package app;

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/MainPage/MainPage.component';
import { Calculator } from './components/Calculator';
import { ResultDisplay } from './components/ResultDisplay';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'calculator', component: Calculator },
  { path: 'results', component: ResultDisplay }
];

@NgModule({
  declarations: [
    MainPageComponent,
    Calculator,
    ResultDisplay
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes)
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }