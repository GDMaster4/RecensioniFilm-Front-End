import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subject, switchMap, takeUntil } from 'rxjs';
import { Review } from '../../entities/review.entity';
import { AuthService } from '../../services/auth.service';
import { ReviewService } from '../../services/review.service';
import { FilmService } from '../../services/film.service';

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

  reviews$ =this.revSrv.reviews$;
  currentUser$= this.authSrv.currentUser$;

  constructor(protected revSrv: ReviewService, protected filmSrv:FilmService,
    protected activatedRoute: ActivatedRoute, protected authSrv:AuthService){}
  
  ngOnInit(): void
  {
    this.activatedRoute.params.pipe(
      takeUntil(this.destroyed$)
    )
    .subscribe(params => {
      this.id$= params['id'];
      this.revSrv.reviewsFilm(this.id$)
    });
    const film= this.filmSrv.one(this.id$);
    film.subscribe(film=>{
      this.titolo=film.Titolo;
      this.anno=film.AnnoUscita;
    });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  isShrek() {
    return  this.titolo.toLowerCase().includes("shrek") ? true : false;
  }
}
