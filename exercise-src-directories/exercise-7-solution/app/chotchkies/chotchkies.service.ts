import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Chotchkie} from './chotchkies.model';
import {HttpClient} from '@angular/common/http';
import {tap} from 'rxjs/operators';

@Injectable()
export class ChotchkiesService {

  private _refreshNeeded$ = new Subject<void>();

  get refreshNeeded$() {
    return this._refreshNeeded$;
  }

  constructor(private httpClient: HttpClient) { }

  getAllChotchkies(): Observable<Chotchkie[]> {
    return this.httpClient.get<Chotchkie[]>('/api/chotchkies');
  }

  getChotchkiesBySearchTerm(term: string) {
    return this.httpClient.get<Chotchkie[]>('/api/chotchkies', { params: { searchTerm: term }});
  }

  createChotchkie(chotchkie: Chotchkie): Observable<Chotchkie> {
    return this.httpClient
      .post<Chotchkie>('/api/chotchkies', chotchkie)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      );
  }

  patchChotchkie(id: number, chotchkieData: any) {
    return this.httpClient.patch<Chotchkie>(`/api/chotchkies/${id}`, chotchkieData)
      .pipe(
        tap(() =>  {
          this._refreshNeeded$.next();
        })
      );
  }

  removeChotchkie(id: number) {
    return this.httpClient.delete(`/api/chotchkies/${id}`)
      .pipe(
        tap(() => {
          this._refreshNeeded$.next();
        })
      );
  }
}
