import { Feedback } from './feedback';
import { Subject } from 'rxjs/Rx';
import { Injectable } from '@angular/core';


@Injectable()
export class FeedbackService {
  private eventStream = new Subject();

  constructor() { }

  private push(feedback: Feedback) {
    this.eventStream.next(feedback);
  }

  pushSuccess(message: string) {
    this.push({message, type: 'success'});
  }

  pushError(message: string) {
    this.push({message, type: 'error'});
  }

  subscribe(callback: (feedback: Feedback) => void) {
    this.eventStream.subscribe(callback);
  }
}
