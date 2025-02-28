import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { reviewFiltersResolver } from './resolvers/review-filters.resolver';
import { ReviewsResolver } from './resolvers/review.resolver';
import { FilmsComponent } from './pages/films/films.component';
import { FilmReviewsComponent } from './pages/film-reviews/film-reviews.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProfiloComponent } from './pages/profilo/profilo.component';
import { authGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/login",
    pathMatch:"full"
  },
  {
    path:"login",
    pathMatch:"full",
    component:LoginComponent
  },
  {
    path:"register",
    pathMatch:"full",
    component:RegisterComponent
  },
  {
    path:"profilo",
    pathMatch:"full",
    canActivate:[authGuard],
    component:ProfiloComponent
  },
  {
    path:"home",
    canActivate:[authGuard],
    pathMatch:"prefix",
    component:HomeComponent,
    resolve:{
      filters:reviewFiltersResolver,
      reviews:ReviewsResolver
    },
    runGuardsAndResolvers:"paramsOrQueryParamsChange"
  },
  {
    path:"films",
    canActivate:[authGuard],
    children: [
      {
        path: '',
        component:FilmsComponent,
      },
      {
        path: ':id/reviews',
        component: FilmReviewsComponent
      }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
