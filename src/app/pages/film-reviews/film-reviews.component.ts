import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { FilmService } from '../../services/film.service';
import { Review } from '../../entities/review.entity';

@Component({
  selector: 'app-film-reviews',
  templateUrl: './film-reviews.component.html',
  styleUrl: './film-reviews.component.css'
})
export class FilmReviewsComponent implements OnInit,OnDestroy
{
  protected destroyed$ = new Subject<void>();
  protected id$:string="";
  titolo:string="";
  anno:number=0;

  reviews$ = new Observable<Review[]>();

  constructor(protected filmSrv: FilmService, protected activatedRoute: ActivatedRoute){}
  
  ngOnInit(): void
  {
    this.reviews$ = this.activatedRoute.params.pipe(
      switchMap(params => {
        const id = params['id'];
        return this.filmSrv.reviewsFilm(id);
      }),
      takeUntil(this.destroyed$)
    );
    this.reviews$.subscribe(reviews => {
      this.titolo = reviews[0].Film.Titolo;
      this.anno = reviews[0].Film.AnnoUscita;
    });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}
