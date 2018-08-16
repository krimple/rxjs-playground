import {Component} from '@angular/core';

@Component({
  selector: 'rxjs-playground-chotchkies',
  template: `
    <h3>Reactive Forms Demo - Chotchkies</h3>
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
