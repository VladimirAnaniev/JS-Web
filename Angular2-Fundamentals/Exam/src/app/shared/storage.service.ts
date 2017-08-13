import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';

@Injectable()
export class StorageService {
  redirectUrl = '';

  saveUser (user) {
    window.localStorage.setItem('user', JSON.stringify(user));
  }

  setName(name) {
    const currentUser = this.getUser();
    currentUser.name = name;
    this.saveUser(currentUser);
  }

  getUser () {
    const userJson = window.localStorage.getItem('user');
    if (userJson) {
      return JSON.parse(userJson);
    }
    return {};
  }

  removeUser () {
    window.localStorage.removeItem('user');
  }

  authenticateUser(token) {
    window.localStorage.setItem('token', token);
  }

  isUserAuthenticated () {
    return window.localStorage.getItem('token') !== null;
  }

  deauthenticateUser () {
    window.localStorage.removeItem('token');
  }

  getToken () {
    return window.localStorage.getItem('token');
  }
}
