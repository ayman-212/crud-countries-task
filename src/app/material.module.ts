import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  imports: [
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
  exports: [
    MatSelectModule,
    MatSlideToggleModule,
    MatSnackBarModule,
    MatButtonModule,
  ],
})
export class MaterialModule {}
