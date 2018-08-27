import {ChotchkiesListComponent} from './chotchkies-list.component';
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [
    ChotchkiesListComponent
  ],
  exports: [
    ChotchkiesListComponent
  ]
})
export class ChotchkiesListModule { }
