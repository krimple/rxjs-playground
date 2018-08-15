import {Component, OnInit} from '@angular/core';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'rxjs-playground-chotchkies-list',
  template: `
    <h3>List of Chotchkies</h3>
    <ul *ngIf="chotchkies">
      <li *ngFor="let chotchkie of chotchkies">
        {{ chotchkie.name }}
        - {{ chotchkie.quantityOnHand }} left
        at {{ chotchkie.price | currency }}
      </li>
    </ul>
    <pre>{{ chotchkies | json }}</pre>
  `
})
export class ChotchkiesListComponent implements OnInit {

  chotchkies: Chotchkie[];

  constructor(private chotchkiesService: ChotchkiesService) { }
  ngOnInit() {
    this.chotchkiesService.getAllChotchkies()
      .pipe(
        tap(c => console.log(`Got chotchkies: ${JSON.stringify(c)}`))
      )
      .subscribe(
        (chotchkies: Chotchkie[]) => this.chotchkies = chotchkies
      );
  }
}
