import { HomeService } from '../home.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private animals: number;
  private users: number;

  constructor(private homeService: HomeService) { }

  ngOnInit() {
    this.homeService.getStats()
      .subscribe(stats => {
        this.animals = stats.animals;
        this.users = stats.users;
      });
  }

}
