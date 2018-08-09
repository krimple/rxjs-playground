import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Chotchkie} from './chotchkies.model';
import {map} from 'rxjs/operators';

@Injectable()
export class ChotchkiesService {
  constructor(private httpClient: HttpClient) { }

  getChotchkies(): Observable<Chotchkie[]> {
    return this.httpClient.get<Chotchkie[]>('/api/chotchkies');
    /*
      .pipe(
        // this is the Observable's map
        map((chotchkies: Chotchkie[]) => {
          // this is just an Array.prototype.map to transform
          // our received result into another form (strip out all but name)
          return chotchkies.map(
            (chotchkie) => {
              return {
                ...chotchkie,
                descriptionLength: chotchkie.description.length
              };
            });
        })
      );
      */
  }
}
