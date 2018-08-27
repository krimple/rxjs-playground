import {from, of, interval} from 'rxjs';
import {map, reduce, take} from 'rxjs/operators';
import {async, fakeAsync, tick} from '@angular/core/testing';

describe('RxJS Experiments', () => {
  it('should do something', () => {
    expect(1).toBe(1);
  });

  it('should generate a stream of data from an array', () => {
    const results = [];

    from([1, 2, 3, 5, 7])
      .subscribe(
        (result) => {
          results.push(result);
        },
        (error) => {
          console.log(error);
          throw error;
        },
        () => {
          expect(results).toEqual([1, 2, 3, 5, 7]);
        }
      );
  });

  it('should generate a single result as an observable', () => {
    const results = [];

    of([1, 2, 3, 5, 7])
      .subscribe(
        (result) => {
          results.push(result);
        },
        (error) => {
          console.log(error);
          throw error;
        },
        () => {
          expect(results).toEqual([[1, 2, 3, 5, 7]]);
        }
      );
  });

  it('should square the stream of data item by item', () => {
    const results = [];
    const ary = [1, 2, 3];
    from(ary).pipe(
      map(v => v * v)
    ).subscribe(
      (result) => {
        results.push(result);
      },
      undefined,
      () => {
        expect(results).toEqual([1, 4, 9]);
      }
    );
  });

  it('min/max all values in a stream', () => {
    from([1, 2, 4, 2, 5]).pipe(
      reduce((acc: { min: number, max: number }, value: number) => {
        if (value < acc.min) {
          acc.min = value;
        }
        if (value > acc.max) {
          acc.max = value;
        }
        return acc;
      }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER })
    ).subscribe(
      (result) => {
        expect(result).toEqual({ min: 1, max: 5 });
      }
    );
  });

  it('square, then min/max all values in a stream', () => {
    from([1, 2, 4, 2, 5]).pipe(
      map(v => v * v),
      reduce((acc: { min: number, max: number }, value: number) => {
        if (value < acc.min) {
          acc.min = value;
        }
        if (value > acc.max) {
          acc.max = value;
        }
        return acc;
      }, { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER })
    ).subscribe(
      (result) => {
        expect(result).toEqual({ min: 1, max: 25 });
      }
    );
  });

  it('should take 100 values', (done) => {
     interval(5)
       .pipe(
         take(10),
         reduce((acc, val) => {
           return acc + val ;
         }, 0)
       )
       .subscribe(
         x => {
           expect(x).toBe(45);
           done();
         }
       );
  });

  it('should take 100 values with async', async(() => {
      interval(50)
       .pipe(
         take(10),
         reduce((acc, val) => {
           return acc + val ;
         }, 0)
       )
       .subscribe(
         x => {
           expect(x).toBe(45);
         }
       );
  }));

  it('should take 100 values with async', fakeAsync(() => {
      interval(500)
      .pipe(
        take(10),
        reduce((acc, val) => {
          return acc + val ;
        }, 0)
      )
       .subscribe(
         x => {
           expect(x).toBe(45);
         }
       );
      tick(10000);
  }));
});
