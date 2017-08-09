import { FeedbackService } from '../feedback/feedback.service';
import { Link } from './link';
import { Router } from '@angular/router';
import { StorageService } from '../storage.service';
import { Component, DoCheck } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements DoCheck {
  links: Link[] = [];
  isAuthenticated: boolean;

  constructor(
    private storageService: StorageService,
    private router: Router,
    private feedbackService: FeedbackService
  ) { }

  ngDoCheck() {
    if (this.checkAuth() !== this.isAuthenticated) {
      this.isAuthenticated = this.checkAuth();
      this.updateLinks();
    }
  }

  updateLinks() {
    if (this.isAuthenticated) {
      this.links = [
        {path: '', label: 'Home'},
        {path: 'profile', label: 'Profile'}
      ];
    } else {
      this.links = [
        {path: '', label: 'Home'},
        {path: 'auth/register', label: 'Register'},
        {path: 'auth/login', label: 'Login'},
      ];
    }
  }

  checkAuth() {
    return this.storageService.isUserAuthenticated();
  }

  logout() {
    this.storageService.deauthenticateUser();
    this.storageService.removeUser();
    this.feedbackService.pushSuccess('Logout Successful!');
    this.router.navigate(['']);
  }
}
