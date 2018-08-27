import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ChotchkiesService} from '../chotchkies.service';

@Component({
  selector: 'rxjs-playground-chotchkie-form',
  template: `
    <div class="container">
    <h3>New Chotchkie...</h3>
      <div class="jumbotron">
        <h3>Your super awesome form here...</h3>
      </div>
    </div>
  `
})
export class CreateChotchkieComponent {

}
