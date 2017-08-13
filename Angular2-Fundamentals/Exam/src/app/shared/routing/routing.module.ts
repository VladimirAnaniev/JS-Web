import { ProfileComponent } from '../../animals/profile/profile.component';
import { DetailsComponent } from '../../animals/details/details.component';
import { ListComponent } from '../../animals/list/list.component';
import { CreateComponent } from '../../animals/create/create.component';
import { AuthGuard } from '../routing/auth-guard.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent, NotFoundComponent } from '../../home';
import { RegisterComponent, LoginComponent } from '../../auth';

const routes: Routes = [
  {path: '', component: HomeComponent},

  {path: 'auth/login', component: LoginComponent},
  {path: 'auth/register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},

  {path: 'animals/create', component: CreateComponent, canActivate: [AuthGuard]},
  {path: 'animals/all', component: ListComponent},
  {path: 'animals/details/:id', component: DetailsComponent, canActivate: [AuthGuard]},

  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '404'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  providers: [AuthGuard],
  exports: [RouterModule]
})
export class RoutingModule {}
