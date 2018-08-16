import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';

@Component({
  selector: 'rxjs-playground-chotchkie-form',
  template: `
    <div class="container">
    <h3>New Chotchkie...</h3>
    <form *ngIf="chotchkieFormGroup" [formGroup]="chotchkieFormGroup">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          name="name"
          formControlName="name">
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <input
          type="text"
          class="form-control"
          name="description"
          formControlName="description">
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          class="form-control"
          formControlName="price">
      </div>
      <div class="form-group">
        <label for="price">Quantity on Hand</label>
        <input
          type="number"
          class="form-control"
          name="quantityOnHand"
          formControlName="quantityOnHand">
      </div>
      <button
        class="btn btn-lg btn-primary"
        type="submit"
        (click)="handleSubmit()">
        Create new Chotchkie
      </button>
    </form>
    </div>
  `
})
export class CreateChotchkieComponent implements OnInit {

  chotchkieFormGroup: FormGroup;
  chotchkieFormValue: Chotchkie;

  constructor(private formBuilder: FormBuilder,
              private chotchkiesService: ChotchkiesService)  { }

  ngOnInit() {
    this.chotchkieFormGroup = this.formBuilder.group({
      name: [''],
      description: [''],
      price: [0],
      quantityOnHand: [0]
    });

  }

  handleSubmit() {
    this.chotchkiesService.createChotchkie(this.chotchkieFormGroup.value)
      .subscribe(
        chotchkie => { console.log(`Saved successfully. ${JSON.stringify(chotchkie)}`); },
        error => { alert(error); }
      );
  }
}
