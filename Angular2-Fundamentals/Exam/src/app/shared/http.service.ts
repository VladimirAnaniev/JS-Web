import { ContentType } from '@angular/http/src/enums';
import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import _ from 'lodash';

import { StorageService } from './storage.service';

const ROOT_PATH = 'http://localhost:5000';

@Injectable()
export class HttpService {
  options;
  headers;

  constructor(private http: Http, private storageService: StorageService) {
    this.headers = new Headers({'Content-Type': 'application/json'});
    this.options = new RequestOptions({headers: this.headers});
  }

  get(path) {
    this.applyAuthorizationHeader();
    return this.http.get(ROOT_PATH + path, this.options);
  }

  post(path, data) {
    this.applyAuthorizationHeader();
    return this.http.post(ROOT_PATH + path, JSON.stringify(data), this.options);
  }

  delete(path) {
    this.applyAuthorizationHeader();
    return this.http.delete(ROOT_PATH + path, this.options);
  }

  applyAuthorizationHeader () {
    if (this.storageService.isUserAuthenticated()) {
      this.headers.set('Authorization', `bearer ${this.storageService.getToken()}`);
      return;
    }
    this.headers.set('Authorization', '');
  }
}
