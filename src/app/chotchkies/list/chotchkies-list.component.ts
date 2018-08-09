import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';



@Component({
  selector: 'rxjs-playground-chotchkies-list',
  template: `
    <ul *ngIf="chotchkies">
      <li *ngFor="let chotchkie of chotchkies">
        {{ chotchkie.name }}
      </li>
    </ul>
    <hr/>
    <pre>{{ chotchkies | json }}</pre>
  `
})
export class ChotchkiesListComponent implements OnInit {
  chotchkies: Chotchkie[] = [];

  constructor(private chotchkiesService: ChotchkiesService) { }

  ngOnInit() {
    this.chotchkiesService.getChotchkies()
      .subscribe((chotchkies: Chotchkie[]) => {
        this.chotchkies = chotchkies;
      });
  }

}
