import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { omitBy, isNil } from 'lodash';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../../collegamento';
import { Review } from '../entities/review.entity';
import { AuthService } from './auth.service';

export interface ReviewFilters
{
  maxReviews:number;
  testo?:string;
}

@Injectable({
  providedIn: 'root'
})
export class ReviewService
{
  protected _reviews$= new BehaviorSubject<Review[]>([]);
  reviews$= this._reviews$.asObservable();
  filtri:ReviewFilters | null=null;

  constructor(protected http:HttpClient, protected authSrv:AuthService)
  {
    authSrv.currentUser$.subscribe(user=>{
      if(user) {
        this.refreshReviews();
      }
      else {
        this._reviews$.next([]);
      }
    })
  }

  refreshReviews()
  {
    if(this.filtri!= null) {
      this.reviews$= this.list(this.filtri)
    }
    else {
      this.fetch();
    }
  }

  fetch()
  {
    this.http.get<Review[]>(`${enviroment.apiUrl}/reviews?maxReviews=5`)
      .subscribe(reviews=>{
        this._reviews$.next(reviews);
      });
  }

  list(filters:ReviewFilters)
  {
    this.filtri=filters;
    const q=omitBy(filters,isNil);
    const result =this.http.get<Review[]>(`${enviroment.apiUrl}/reviews`,{params: q});
    result.subscribe(reviews=>{
      this._reviews$.next(reviews);
    });
    return result;
  }

  add(newReview:Partial<Omit<Review, "id" |"DataInserimento" | "DataUltModifica"| "Film">>,film:string)
  {
    const review={...newReview,Film:film};
    this.http.post<Review>(`${enviroment.apiUrl}/reviews`, review)
      .subscribe(addReview => {
        const tmp = structuredClone(this._reviews$.value);
        const index = this._reviews$.value.findIndex(review => review.id === addReview.id);
        if(index!=-1){
          tmp.push(addReview);
        }
        else{
          tmp[index] = addReview;
        }
        this._reviews$.next(tmp);
        this.refreshReviews();
      },error => {
        console.error(error);
      });
  }
  
  modify(id:string, updateReview:Partial<Omit<Review, "id" |"DataInserimento" | "DataUltModifica"| "Film">>,film:string)
  {    
    const review={...updateReview,Film:film};
    this.http.patch<Review>(`${enviroment.apiUrl}/reviews/${id}/modify`,review)
      .subscribe(updated => {
        const index = this._reviews$.value.findIndex(review => review.id === id);
        const tmp = structuredClone(this._reviews$.value);
        tmp[index] = updated;
        this._reviews$.next(tmp);
        this.refreshReviews();
      },error => {
        console.error(error);
      });
  }

  remove(id:string)
  {
    this.http.delete<Review>(`${enviroment.apiUrl}/reviews/${id}/delete`)
      .subscribe(deleted => {
        const tmp = structuredClone(this._reviews$.value);
        const index = this._reviews$.value.findIndex(review => review.id === id);
        tmp.splice(index,1);
        console.log(tmp);
        this._reviews$.next(tmp);
        this.refreshReviews();
      }, error => {
        console.error(error);
      });
  }
}