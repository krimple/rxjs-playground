import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {ChotchkiesListComponent} from './chotchkies-list.component';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {ChotchkiesService} from '../chotchkies.service';
import {By} from '@angular/platform-browser';
import {DebugElement} from '@angular/core';

describe('Should List Chotchkies', () => {

  let chotchkiesListFixture: ComponentFixture<ChotchkiesListComponent>;
  let httpTestingController: HttpTestingController;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      declarations: [
        ChotchkiesListComponent
      ],
      providers: [
        ChotchkiesService
      ]
    }).compileComponents()
      .then(() => {
        chotchkiesListFixture = TestBed.createComponent(ChotchkiesListComponent);
        httpTestingController = TestBed.get(HttpTestingController);
      });
  }));

  it('should have a list of chotchkies on startup', () => {
    expect(chotchkiesListFixture).toBeDefined();
    chotchkiesListFixture.componentInstance.ngOnInit();
    httpTestingController.expectOne('/api/chotchkies')
      .flush([
        {
         id: 1,
         name: 'Paper Clip',
         description: 'The greatest paper clip ever. Now with logo',
         quantityOnHand: 1000,
         price: 200
        },
        {
         id: 1,
         name: 'Stapler',
         description: 'The greatest stapler ever. Now with logo',
         quantityOnHand: 50,
         price: 10
        }
      ]);
    expect(chotchkiesListFixture.componentInstance.chotchkies).toBeDefined();

    // check for changes between component and template and reconcile
    chotchkiesListFixture.detectChanges();
    const listItems: DebugElement[] = chotchkiesListFixture.debugElement.queryAll(By.css('li'));
    expect(listItems.length).toBe(2);
  });
});
