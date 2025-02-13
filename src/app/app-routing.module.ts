import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { reviewFiltersResolver } from './resolvers/review-filters.resolver';
import { ReviewsResolver } from './resolvers/review.resolver';
import { FilmsComponent } from './pages/films/films.component';

const routes: Routes = [
  {
    path:"",
    redirectTo:"/home?maxReviews=5",
    pathMatch:"full"
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
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
