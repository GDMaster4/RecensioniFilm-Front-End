import { Component, EventEmitter, OnDestroy, OnInit } from '@angular/core';
import { ReviewFilters, ReviewService } from '../../services/review.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  ReplaySubject, Subject, debounceTime, map, takeUntil } from 'rxjs';
import { omitBy, isNil } from 'lodash';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit,OnDestroy
{
  protected updateQueryParams$ = new ReplaySubject<ReviewFilters>();
  protected destroyed$ = new Subject<void>();
  reviews$=this.revSrv.reviews$;
  currentUser$= this.authSrv.currentUser$;
  
  constructor(protected revSrv: ReviewService, protected authSrv:AuthService,
    protected router: Router, protected activatedRoute: ActivatedRoute){}

  ngOnInit(): void
  {
    this.updateQueryParams$
        .pipe(
          takeUntil(this.destroyed$),
          map(filters => omitBy(filters, isNil)),
          map(filters => omitBy(filters, val => val === '')),
          debounceTime(150)
        )
        .subscribe(filters => {
          this.router.navigate([], {queryParams: filters});
        });
    this.activatedRoute.data.subscribe(data => console.log(data));    
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  applyFilters(value:ReviewFilters){
    this.updateQueryParams$.next(value);
  }
}