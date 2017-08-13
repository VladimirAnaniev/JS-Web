import { FeedbackService } from "../../shared/feedback/feedback.service";
import { Animal } from "../animal";
import { ActivatedRoute } from "@angular/router";
import { AnimalsService } from "../animals.service";
import { Component, OnInit, ViewChild } from "@angular/core";

@Component({
  selector: "app-details",
  templateUrl: "./details.component.html",
  styleUrls: ["./details.component.css"]
})
export class DetailsComponent implements OnInit {
  private id: number;
  animal: Animal;
  comments: any[];
  @ViewChild('commentInput') commentInput;

  constructor(
    private activatedRoute: ActivatedRoute,
    private animalsService: AnimalsService,
    private feedbackService: FeedbackService
  ) {}

  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.id = params["id"];

      this.fetch();
    });
  }

  fetch() {
    this.fetchDetails();
    this.fetchComments();
  }

  fetchDetails() {
    this.animalsService.details(this.id).subscribe(animal => {
      this.animal = animal;
    });
  }

  fetchComments() {
    this.animalsService.fetchComments(this.id).subscribe(comments => {
      console.log(comments)
      this.comments = comments;
    })
  }

  reactionChange(reaction) {
    this.animalsService.reaction(this.id, reaction).subscribe(response => {
      if (response.success) {
        this.feedbackService.pushSuccess(response.message);
      } else {
        this.feedbackService.pushError(response.message);
      }
    });
  }

  comment(message) {
    this.animalsService.comment(this.id, message).subscribe(response => {
      if (response.success) {
        this.feedbackService.pushSuccess(response.message);
        this.commentInput.nativeElement.value = ''; 
        this.fetchComments();
      } else {
        this.feedbackService.pushError(response.message);
      }
    });
  }
}
