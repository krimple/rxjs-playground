import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ChotchkiesListComponent} from './list/chotchkies-list.component';
import {NgModule} from '@angular/core';
import {ChotchkiesService} from './chotchkies.service';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
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
