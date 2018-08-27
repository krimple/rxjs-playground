import {Component} from '@angular/core';

@Component({
  selector: 'rxjs-playground-chotchkies',
  template: `
    <div class="navbar">
      <div class="navbar-text">
        <h1>Reactive Forms Demo - Chotchkies</h1>
      </div>
    </div>
    <div class="row border-top border-dark">
      <div class="col-7">
        <rxjs-playground-chotchkies-list></rxjs-playground-chotchkies-list>
      </div>
      <div class="col-5 border-left border-dark">
        <rxjs-playground-chotchkie-form></rxjs-playground-chotchkie-form>
      </div>
    </div>
  `
})
export class ChotchkiesContainerComponent {

}
