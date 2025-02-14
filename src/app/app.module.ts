import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NgbDateAdapter, NgbDateParserFormatter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DateAdapter, DateParserFormatter } from './utils/Datepicker-adapter';
import { ReviewFiltersComponent } from './components/review-filters/review-filters.component';
import { ReviewComponent } from './components/review/review.component';
import { DeleteReviewComponent } from './components/delete-review/delete-review.component';
import { ReviewDetailComponent } from './components/review-detail/review-detail.component';
import { AddReviewComponent } from './components/add-review/add-review.component';
import { FilmsComponent } from './pages/films/films.component';
import { FilmComponent } from './components/film/film.component';
import { FilmReviewsComponent } from './pages/film-reviews/film-reviews.component';
import { IfAuthenticatedDirective } from './directives/if-authenticated.directive';
import { AuthInterceptor } from './utils/auth-interceptor';
import { ToastrModule } from 'ngx-toastr';
import { NavUserComponent } from './components/nav-user/nav-user.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ReviewComponent,
    ReviewDetailComponent,
    ReviewFiltersComponent,
    DeleteReviewComponent,
    AddReviewComponent,
    FilmsComponent,
    FilmComponent,
    FilmReviewsComponent,
    IfAuthenticatedDirective,
    NavUserComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right',
      preventDuplicates: true,
    }),
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi:true},
    {
      provide: NgbDateAdapter,
      useClass: DateAdapter
    },
    {
      provide: NgbDateParserFormatter,
      useClass: DateParserFormatter
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }