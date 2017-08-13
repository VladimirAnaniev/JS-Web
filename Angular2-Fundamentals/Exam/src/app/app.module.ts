import { AnimalsModule } from './animals/animals.module';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MaterialModule } from '@angular/material';

import { SharedModule } from './shared';
import { HomeModule } from './home';
import { RoutingModule } from './shared/routing';
import { AuthModule } from './auth';

import 'hammerjs';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AuthModule,
    RoutingModule,
    HomeModule,
    SharedModule,
    HttpModule,
    MaterialModule,
    AnimalsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
