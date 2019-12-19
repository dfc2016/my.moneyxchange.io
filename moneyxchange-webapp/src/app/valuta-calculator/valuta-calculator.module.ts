import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TextMaskModule } from 'angular2-text-mask';
import { SharedModule } from '../shared/shared.module';

import { CalculatorComponent } from './components/calculator';
import { CalculatorService } from './services/calculator';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    TextMaskModule,
    SharedModule
  ],
  providers: [
    CalculatorService
  ],
  declarations: [
    CalculatorComponent
  ],
  exports: [
    CalculatorComponent
  ]
})
export class ValutaCalculatorModule { }
