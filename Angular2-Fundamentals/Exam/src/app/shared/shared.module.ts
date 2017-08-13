import { FeedbackService } from './feedback/feedback.service';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MdTabsModule } from '@angular/material';

import { StorageService } from './storage.service';
import { AuthModule } from '../auth/auth.module';
import { HttpService } from './http.service';
import { HeaderComponent } from './header/header.component';
import { FeedbackComponent } from './feedback/feedback.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MdTabsModule
  ],
  providers: [HttpService, StorageService, FeedbackService],
  declarations: [HeaderComponent, FeedbackComponent],
  exports: [HeaderComponent, FeedbackComponent]
})
export class SharedModule { }
