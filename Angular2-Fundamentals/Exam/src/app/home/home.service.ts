import { Observable } from 'rxjs/Rx';
import { HttpService } from '../shared';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class HomeService {

  constructor(private http: HttpService) { }

  getStats() {
    return this.http.get('/stats')
      .map(res => res.json())
      .catch(err => Observable.throw(err));
  }
}
