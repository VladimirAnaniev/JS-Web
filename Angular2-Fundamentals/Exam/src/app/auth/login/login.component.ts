import { FeedbackService } from '../../shared/feedback/feedback.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '..';
import { StorageService } from '../../shared';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  error = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private storageService: StorageService,
    private feedbackService: FeedbackService
  ) { }

  login(formValues) {
    this.authService.login(formValues)
      .subscribe(response => {
        if (response.success) {
          this.feedbackService.pushSuccess(response.message);
          this.authenticate(response.token, response.user);
          this.router.navigate([this.storageService.redirectUrl]);
        } else {
          this.feedbackService.pushError(response.message);
          this.error = response.message;
        }
      });
  }

  authenticate(token, user) {
    this.storageService.authenticateUser(token);
    this.storageService.saveUser(user);
  }
}
