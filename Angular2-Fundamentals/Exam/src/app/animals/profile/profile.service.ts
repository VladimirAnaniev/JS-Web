import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';
import { HttpService } from '../../shared/http.service'

@Injectable()
export class ProfileService {

  constructor(
    private http: HttpService
  ) { }

  getMine(): Observable<any> {
    return this.http.get('/animals/mine')
      .map(res => res.json());
  }

  delete(id): Observable<any> {
    return this.http.post(`/animals/delete/${id}`, {})
      .map(res => res.json());
  }
}
