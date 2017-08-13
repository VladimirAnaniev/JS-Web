import { Animal } from './animal';
import { Observable } from 'rxjs/Rx';
import { HttpService } from '../shared';
import { Injectable } from '@angular/core';

@Injectable()
export class AnimalsService {

  constructor(private http: HttpService) { }

  create(payload: Animal): Observable<any> {
    return this.http.post('/animals/create', payload)
      .map(res => res.json());
  }

  list(query): Observable<Animal[]> {
    return this.http.get(`/animals/all${query}`)
      .map(res => res.json() as Animal[]);
  }

  details(id): Observable<Animal> {
    return this.http.get(`/animals/details/${id}`)
      .map(res => res.json() as Animal);
  }

  reaction(id, reaction): Observable<any> {
    return this.http.post(`/animals/details/${id}/reaction`, { type: reaction })
      .map(res => res.json());
  }

  comment(id, message): Observable<any> {
    return this.http.post(`/animals/details/${id}/comments/create`, {message})
      .map(res => res.json());
  }

  fetchComments(id): Observable<any> {
    return this.http.get(`/animals/details/${id}/comments`)
      .map(res => res.json());
  }
}
