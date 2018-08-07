import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {ChotchkiesModule} from './chotchkies/chotchkies.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ChotchkiesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
