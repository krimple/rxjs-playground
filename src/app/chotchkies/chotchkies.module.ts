import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChotchkiesListComponent} from './list/chotchkies-list.component';
import {NgModule} from '@angular/core';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule
  ],
  declarations: [
    ChotchkiesListComponent
  ],
  exports: [
    ChotchkiesListComponent
  ]
})
export class ChotchkiesModule { }
