import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ChotchkiesService} from './chotchkies.service';
import {HttpClientModule} from '@angular/common/http';
import {ChotchkiesListModule} from './list/chotchkies-list.module';
import {ChotchkiesContainerComponent} from './chotchkies-container.component';

@NgModule({
  imports: [
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule,
    ChotchkiesListModule
  ],
  declarations: [
    ChotchkiesContainerComponent
  ],
  providers: [
    ChotchkiesService
  ],
  exports: [
    ChotchkiesContainerComponent
  ]
})
export class ChotchkiesModule { }
