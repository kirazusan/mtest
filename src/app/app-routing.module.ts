package app;

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPageComponent } from './components/MainPage/MainPage.component';
import { Calculator } from './components/Calculator';
import { ResultDisplay } from './components/ResultDisplay';

const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'calculator', component: Calculator },
  { path: 'result', component: ResultDisplay }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }