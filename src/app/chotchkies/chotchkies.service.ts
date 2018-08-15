import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {Chotchkie} from './chotchkies.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ChotchkiesService {

  constructor(private httpClient: HttpClient) { }

  getAllChotchkies(): Observable<Chotchkie[]> {
    return this.httpClient.get<Chotchkie[]>('/api/chotchkies');
  }

  // never, never, ever do two REST calls in a row like this
  // lest you provoke the Transaction Gods... but good enough
  // for our silly demo
  buyChotchkie(id: number, quantity: number) {

  }
}
