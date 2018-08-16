import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Chotchkie} from '../chotchkies.model';
import {ChotchkiesService} from '../chotchkies.service';

@Component({
  selector: 'rxjs-playground-chotchkie-form',
  template: `
    <div class="container">
    <h3>New Chotchkie...</h3>
    <form
      *ngIf="chotchkieFormGroup"
      (submit)="handleSubmit()"
      [formGroup]="chotchkieFormGroup">
      <div class="form-group">
        <label for="name">Name</label>
        <input
          type="text"
          class="form-control"
          name="name"
          formControlName="name">
        <div
          *ngIf="chotchkieFormGroup.controls.name.invalid &&
                 chotchkieFormGroup.controls.name.touched"
          class="is-invalid">
          Name must be between 1 and 60 characters
        </div>
      </div>
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          class="form-control"
          name="description"
          formControlName="description">
        </textarea>
        <div
          *ngIf="chotchkieFormGroup.controls.description.invalid &&
                 chotchkieFormGroup.controls.description.touched"
          class="is-invalid">
          Description must be between 1 and 1024 characters
        </div>
      </div>
      <div class="form-group">
        <label for="price">Price</label>
        <input
          type="number"
          name="price"
          class="form-control"
          formControlName="price">
        <div
          *ngIf="chotchkieFormGroup.controls.price.invalid &&
                 chotchkieFormGroup.controls.price.touched"
          class="is-invalid">
          Price must be between 0 and 1000000
        </div>
      </div>
      <div class="form-group">
        <label for="price">Quantity on Hand</label>
        <input
          type="number"
          class="form-control"
          name="quantityOnHand"
          formControlName="quantityOnHand">
        <div
          *ngIf="chotchkieFormGroup.controls.quantityOnHand.invalid &&
                 chotchkieFormGroup.controls.quantityOnHand.touched"
          class="is-invalid">
          Quantity on hand must be >= 0
        </div>
      </div>
      <button
        [disabled]="chotchkieFormGroup.invalid"
        class="btn btn-lg btn-primary"
        type="submit">
        Create new Chotchkie
      </button>
    </form>
    </div>
  `
})
export class CreateChotchkieComponent implements OnInit {

  chotchkieFormGroup: FormGroup;

  constructor(private formBuilder: FormBuilder,
              private chotchkiesService: ChotchkiesService)  { }

  ngOnInit() {
    this.chotchkieFormGroup = this.formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.maxLength(1024)]],
      price: [0, [Validators.required, Validators.min(0), Validators.max(100000)]],
      quantityOnHand: [0, [Validators.required, Validators.min(0)]]
    });
  }

  handleSubmit() {
    this.chotchkiesService.createChotchkie(this.chotchkieFormGroup.value)
      .subscribe(
        chotchkie => {
          console.log(`Saved successfully. ${JSON.stringify(chotchkie)}`);
          this.chotchkieFormGroup.reset({ name: '', description: '', price: 0, quantityOnHand: 0 });
        },
        error => { alert(error); }
      );
  }
}
