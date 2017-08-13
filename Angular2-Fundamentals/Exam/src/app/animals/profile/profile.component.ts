import { FeedbackService } from '../../shared/feedback/feedback.service';
import { Animal } from '../../animals/animal';
import { ProfileService } from './profile.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  animals: Animal[];

  constructor(
    private profileService: ProfileService,
    private feedbackService: FeedbackService
  ) { }

  ngOnInit() {
    this.fetch()
  }

  fetch() {
    this.profileService.getMine().subscribe(animals => {
      this.animals = animals;
    })
  }

  delete(id) {
    this.profileService.delete(id).subscribe(response => {
      if (response.success) {
        this.feedbackService.pushSuccess(response.message);
        this.fetch();
      } else {
        this.feedbackService.pushError(response.message);
      }
    });
  }

}
