import {Component, OnInit, ViewChild} from '@angular/core';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';
import {merge, of} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, switchMap, tap} from 'rxjs/operators';
import {FormBuilder, NgModel} from '@angular/forms';

@Component({
  selector: 'rxjs-playground-chotchkies-list',
  template: `
    <h3>List of Chotchkies</h3>
    <div class="row"><div class="col">&nbsp;</div></div>
      <table class="table table-bordered table-striped table-responsive-sm" *ngIf="chotchkies">
        <tr class="mb-2" *ngFor="let chotchkie of chotchkies">
          <td>{{ chotchkie.name }} </td>
          <td>{{ chotchkie.description }}</td>
          <td>{{ chotchkie.quantityOnHand }}</td>
          <td>{{ chotchkie.price | currency }}</td>
        </tr>
      </table>
  `
})
export class ChotchkiesListComponent implements OnInit {

  chotchkies: Chotchkie[];

  constructor(private chotchkiesService: ChotchkiesService) { }

  ngOnInit() {
    this.chotchkiesService.getAllChotchkies()
      .subscribe(
        (chotchkies: Chotchkie[]) => this.chotchkies = chotchkies
      );
  }
}
