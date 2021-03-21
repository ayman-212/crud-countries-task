import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoResultWidgetComponent } from './components/no-result-widget/no-result-widget.component';

import { MaterialModule } from '../material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DetailsComponent } from './components/details/details.component';

@NgModule({
  declarations: [NoResultWidgetComponent, DetailsComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialModule],
  exports: [
    NoResultWidgetComponent,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    DetailsComponent,
  ],
})
export class SharedModule {}

// Featured Modules
// Shared Modules
