import {NgModule} from '@angular/core';
import {CreateChotchkieComponent} from './create-chotchkie.component';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [
    CreateChotchkieComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    CreateChotchkieComponent
  ]
})
export class CreateChotchkieModule { }
