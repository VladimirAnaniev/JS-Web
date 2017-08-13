import { Feedback } from './feedback';
import { FeedbackService } from './feedback.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  message: string;
  type: string;

  constructor(private feedbackService: FeedbackService) { }

  ngOnInit() {
    this.feedbackService.subscribe((feedback: Feedback) => {
      this.updateMessage(feedback);
    });
  }

  updateMessage(feedback: Feedback) {
    this.message = feedback.message;
    this.type = feedback.type;

    setTimeout(() => {
      this.clear();
    }, 5000);
  }

  clear() {
    this.message = '';
    this.type = '';
  }

}
