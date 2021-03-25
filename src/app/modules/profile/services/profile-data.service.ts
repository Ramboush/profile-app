import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {forkJoin, Observable, Subject, timer} from 'rxjs';
import {concatMap, debounce, mergeMap} from 'rxjs/operators';

@Injectable()
export class ProfileDataService {
  public savedProfileData = new Subject();

  constructor(private http: HttpClient) {

  }

  public saveProfileData(data: any): void {
    this.savedProfileData.next(data);
  }

  public submitProfileData(data: any): Observable<any> {
    const uri = '/api/post';
    return this.http.post(uri, data).pipe(debounce(() => timer(5000)));
  }

  public loadAppData(params: Array<string>): Observable<any> {
    const baseUri = '/api/get?';
    return this.http.get(baseUri + params[0])
        .pipe(
            concatMap(fistData => this.http.get(baseUri + params[1])),
            concatMap(secondData => this.http.get(baseUri + params[2])),
            );
  }

  /* Solution for case when we want to call all 3 endpoints in parallel */
  public loadAppDataWithForkJoin(params: Array<string>): Observable<any> {
    const callUris = [];
    const baseUri = '/api/get?';
    for (const param of params) {
      callUris.push(this.http.get(baseUri + param));
    }
    return forkJoin(callUris);
  }
}
