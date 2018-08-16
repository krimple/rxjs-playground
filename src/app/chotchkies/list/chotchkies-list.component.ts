import {Component, OnInit} from '@angular/core';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'rxjs-playground-chotchkies-list',
  template: `
      <h3>List of Chotchkies</h3>
      <form class="form-inline">
        <label>Filter</label>
        <input
          class="form-control"
          type="text"
          #filterInput>
        <button
          class="btn btn-danger">
          Search!
        </button>
      </form>
      <div class="row"><div class="col">&nbsp;</div></div>
      <table class="table table-bordered table-striped table-responsive-sm" *ngIf="chotchkies">
        <tr class="mb-2" *ngFor="let chotchkie of chotchkies">
          <td>{{ chotchkie.name }} </td>
          <td>{{ chotchkie.quantityOnHand }}</td>
          <td>{{ chotchkie.price | currency }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              (click)="decrementInventory(chotchkie.id)">
           Buy one!
          </button>
          </td>
          <td>
            <button
              class="btn btn-sm btn-danger"
              (click)="removeChotchkie(chotchkie.id)">
            Delete
          </button>
          </td>
        </tr>
      </table>
  `
})
export class ChotchkiesListComponent implements OnInit {

  chotchkies: Chotchkie[];

  constructor(private chotchkiesService: ChotchkiesService) {
  }

  ngOnInit() {
    this.getAllChotchkies();
    this.chotchkiesService.refreshNeeded.subscribe(
      () => {
        console.log('got a refresh');
        this.getAllChotchkies();
      }
    );
  }

  private getAllChotchkies() {
    this.chotchkiesService.getAllChotchkies()
      .pipe(
        tap(c => console.log(`Got chotchkies: ${JSON.stringify(c)}`))
      )
      .subscribe(
        (chotchkies: Chotchkie[]) => this.chotchkies = chotchkies
      );
  }

  private decrementInventory(id: number) {
    this.chotchkiesService.patchChotchkie(id, {
      purchasedQuantity: 1
    })
      .subscribe(
        () => console.log(`Quantity updated...`),
        (error) => alert(error)
    );
  }

  private removeChotchkie(id: number) {
    this.chotchkiesService.removeChotchkie(id)
      .subscribe(
        () => console.log(`${id} deleted.`),
        (error) => alert(error)
      );
  }
}
