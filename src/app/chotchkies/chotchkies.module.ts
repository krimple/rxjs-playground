import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChotchkiesListComponent} from './list/chotchkies-list.component';
import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {ChotchkiesService} from './chotchkies.service';

@NgModule({
  imports: [
    ReactiveFormsModule,
    CommonModule,
    HttpClientModule
  ],
  declarations: [
    ChotchkiesListComponent
  ],
  providers: [
    ChotchkiesService
  ],
  exports: [
    ChotchkiesListComponent
  ]
})
export class ChotchkiesModule { }
