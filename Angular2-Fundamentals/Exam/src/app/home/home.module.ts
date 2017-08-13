import { HomeService } from './home.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdCardModule } from '@angular/material';

import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  imports: [
    CommonModule,
    MdCardModule
  ],
  declarations: [HomeComponent, NotFoundComponent],
  providers: [HomeService]
})
export class HomeModule { }
