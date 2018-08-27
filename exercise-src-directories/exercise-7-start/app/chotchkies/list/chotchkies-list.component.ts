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
      <form>
          <label>Filter</label>
          <input
            [(ngModel)]="searchTerm"
            class="form-control"
            name="searchTerm"
            type="text"
            #filterInput="ngModel">
          <button
            class="btn btn-danger">
            Search!
          </button>
      </form>
    <div class="row"><div class="col">&nbsp;</div></div>
      <table class="table table-bordered table-striped table-responsive-sm" *ngIf="chotchkies">
        <tr class="mb-2" *ngFor="let chotchkie of chotchkies">
          <td>{{ chotchkie.name }} </td>
          <td>{{ chotchkie.description }}</td>
          <td>{{ chotchkie.quantityOnHand }}</td>
          <td>{{ chotchkie.price | currency }}</td>
          <td>
            <button
              class="btn btn-sm btn-primary"
              (click)="decrementInventory(chotchkie.id)">
           Buy one! </button>
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

  @ViewChild('filterInput') filterInput: NgModel;

  searchTerm: string;

  chotchkies: Chotchkie[];

  constructor(private formBuilder: FormBuilder,
              private chotchkiesService: ChotchkiesService) { }

  ngOnInit() {

    this.filterInput
      .valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged()
      )
      .subscribe(term => {
        if (term) {
          this.getChotchkiesBySearchTerm(term);
        } else {
          this.getAllChotchkies();
        }
      });


    this.chotchkiesService.refreshNeeded$.pipe(
      tap(() => this.filterInput.control.reset(null))
    ).subscribe();
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

  private getChotchkiesBySearchTerm(term: string) {
    this.chotchkiesService.getChotchkiesBySearchTerm(term)
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
