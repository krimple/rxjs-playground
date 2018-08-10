import {Component, OnInit} from '@angular/core';
import {ChotchkiesService} from '../chotchkies.service';
import {Chotchkie} from '../chotchkies.model';

@Component({
  selector: 'rxjs-playground-chotchkies-list',
  template: `
    <h3>List of Chotchkies</h3>
    <ul>
      <li *ngFor="let chotchkie of chotchkies">
        {{ chotchkie.name }} - {{ chotchkie.description }}
      </li>
    </ul><pre>{{ chotchkies | json }}</pre>
  `
})
export class ChotchkiesListComponent implements OnInit {

  chotchkies: Chotchkie[];

  constructor(private chotchkiesService: ChotchkiesService) { }

  ngOnInit() {
    this.chotchkiesService.getAllChotckies()
      .subscribe(
        (chotchkies) => {
          console.log('got to subscription data');
          this.chotchkies = chotchkies;
        },
        error => {
          console.log(`error is ${error}`);
        },
        () => {
          console.log('complete');
        }
      );
  }
}
