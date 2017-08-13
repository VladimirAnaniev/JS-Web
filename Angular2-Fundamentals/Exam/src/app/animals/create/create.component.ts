import { Router } from "@angular/router";
import { FeedbackService } from "../../shared/feedback/feedback.service";
import { AnimalsService } from "../animals.service";
import { Component, OnInit } from "@angular/core";
import { Animal } from "../animal";

@Component({
  selector: "app-create",
  templateUrl: "./create.component.html",
  styleUrls: ["./create.component.css"]
})
export class CreateComponent implements OnInit {
  constructor(
    private animalsService: AnimalsService,
    private feedbackService: FeedbackService,
    private router: Router
  ) {}

  ngOnInit() {}

  create(animal) {
    this.animalsService.create(animal).subscribe(response => {
      if (response.success) {
        this.feedbackService.pushSuccess(response.message);
        this.router.navigate(["/animals/all"]);
      } else {
        this.feedbackService.pushError(response.message);
      }
    });
  }
}
