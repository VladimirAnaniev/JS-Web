import { FeedbackService } from '../../shared/feedback/feedback.service';
import { Router } from '@angular/router';
import { Component } from '@angular/core';

import { AuthService } from '..';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  errors: any = {};

  constructor(
    private authService: AuthService,
    private router: Router,
    private feedbackService: FeedbackService
  ) { }

  register(formValues) {
    this.authService.signup(formValues)
      .subscribe(response => {
        if (response.success) {
          this.feedbackService.pushSuccess(response.message);
          this.router.navigate(['auth/login']);
        } else {
          this.feedbackService.pushError(response.message);
          this.errors = response.errors;
        }
      });
  }
}
