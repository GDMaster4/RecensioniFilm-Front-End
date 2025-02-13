import {
  Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '../entities/review.entity';
import { ReviewFilters, ReviewService } from '../services/review.service';

@Injectable({
  providedIn: 'root'
})
export class ReviewsResolver implements Resolve<Review[]> 
{
  constructor(protected revSrv: ReviewService) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Review[]>
  {
    const filters = route.queryParams as ReviewFilters;
    return this.revSrv.list(filters);
  }
}