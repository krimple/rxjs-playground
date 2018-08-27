import {ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
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
  ],
  exports: [
    ChotchkiesContainerComponent
  ]
})
export class ChotchkiesModule { }
