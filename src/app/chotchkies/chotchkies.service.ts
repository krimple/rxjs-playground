import {Chotchkie} from './chotchkies.model';
import {Observable, ReplaySubject} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';

@Injectable()
export class ChotchkiesService {

  constructor(private httpClient: HttpClient) { }

  getAllChotckies(): Observable<Chotchkie[]> {
    return this.httpClient.get<Chotchkie[]>('/api/chotchkies');
  }

  getAllChotckiesHardcoded(): Observable<Chotchkie[]> {
    const results = new ReplaySubject<Chotchkie[]>();

    results.next([
      {
        id: 1,
        name: 'Stapler',
        description: 'My stapler!',
        price: 15,
        quantityOnHand: 1
      },
      {
        id: 2,
        name: 'Stapler',
        description: 'My stapler!',
        price: 15,
        quantityOnHand: 1
      }
    ]);

    results.complete();
    return results;
  }
}
