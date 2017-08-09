import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { HttpService } from '../shared';

@Injectable()
export class AuthService {

  constructor(private http: HttpService) { }

  signup(payload): Observable<any> {
    return this.http.post('/auth/signup', payload)
      .map(result => result.json())
      .catch(err => Observable.throw(err));
  }

  login(payload): Observable<any> {
    return this.http.post('/auth/login', payload)
      .map(result => result.json())
      .catch(err => Observable.throw(err));
  }

}
