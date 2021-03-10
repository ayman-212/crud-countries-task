import { NgModule } from '@angular/core';

import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

@NgModule({
  imports: [MatSelectModule, MatSlideToggleModule],
  exports: [MatSelectModule, MatSlideToggleModule],
})
export class MaterialModule {}
