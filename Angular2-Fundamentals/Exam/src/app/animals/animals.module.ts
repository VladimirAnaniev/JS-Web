import { ProfileService } from './profile/profile.service';
import { ProfileComponent } from './profile/profile.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AnimalsService } from './animals.service';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import {
  MdInputModule,
  MdButtonModule,
  MdCardModule,
  MdSelectModule,
  MdListModule
} from "@angular/material";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    MdInputModule,
    MdButtonModule,
    MdCardModule,
    MdSelectModule,
    MdListModule,
    RouterModule
  ],
  declarations: [ListComponent, CreateComponent, DetailsComponent, ProfileComponent],
  providers: [AnimalsService, ProfileService]
})
export class AnimalsModule { }
