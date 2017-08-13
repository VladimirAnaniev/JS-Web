import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsService } from '../animals.service';
import { Component, OnInit } from '@angular/core';
import { Animal } from "../animal";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  private page: number;
  private searchQuery: string;
  animals: Animal[];

  constructor(
    private animalsService: AnimalsService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.activatedRoute.queryParams
      .subscribe(params => {
        this.page = params['page'] || 1;
        this.searchQuery = params['search'];

        this.fetchData();
      })
  }

  fetchData() {
    this.animalsService.list(this.generateQuery()).subscribe(animals => {
      this.animals = animals;
    });  
  }

  nextPage() {
    this.page++;
    this.router.navigate(
      [`animals/all`], {queryParams: this.generateQueryParams()}
    )
  }

  prevPage() {
    this.page--;
    this.router.navigate(
      [`animals/all`], {queryParams: this.generateQueryParams()}
    )
  }

  search() {
    this.page = 1;
    console.log(this.generateQuery())
    this.router.navigate(
      [`animals/all`], {queryParams: this.generateQueryParams()}
    )
  }

  private generateQueryParams() {
    const params: any = {
    }
    
    if(this.page !== 1) {
      params.page = this.page;
    }
    if(this.searchQuery) {
      params.search = this.searchQuery;
    }

    return params
  }

  private generateQuery() {
    return `?page=${this.page || 1}${this.searchQuery ? '&search='+this.searchQuery : ''}`
  }
}
