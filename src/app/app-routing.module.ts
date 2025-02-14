import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { reviewFiltersResolver } from './resolvers/review-filters.resolver';
import { ReviewsResolver } from './resolvers/review.resolver';
import { FilmsComponent } from './pages/films/films.component';
import { FilmReviewsComponent } from './pages/film-reviews/film-reviews.component';
import { LoginComponent } from './pages/login/login.component';

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
    path:"home",
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
