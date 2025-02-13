import { Injectable } from '@angular/core';
import { Film, GenereFilm } from '../entities/film.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../../collegamento';
import { Review } from '../entities/review.entity';

@Injectable({
  providedIn: 'root'
})
export class FilmService
{
  protected _films$= new BehaviorSubject<Film[]>([]);
  films$= this._films$.asObservable();

  constructor(protected http:HttpClient) {
    this.fetch();
  }

  fetch()
  {
    this.http.get<Film[]>(`${enviroment.apiUrl}/films`)
      .subscribe(films=>{
        this._films$.next(films);
      });
  }

  reviewsFilm(id:string) {
    return this.http.get<Review[]>(`${enviroment.apiUrl}/films/${id}/reviews`);
  }
}