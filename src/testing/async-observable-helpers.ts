import { defer, Observable } from 'rxjs';

export function asyncData<T>(data: T): Observable<T> {
  return defer(() => Promise.resolve(data));
}

export function asyncError<T>(errorObject: any): Observable<T> {
  return defer(() => Promise.reject(errorObject));
}
