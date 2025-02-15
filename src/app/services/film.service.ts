import { Injectable } from '@angular/core';
import { Film, GenereFilm } from '../entities/film.entity';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { enviroment } from '../../../collegamento';
import { Review } from '../entities/review.entity';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class FilmService
{
  protected _films$= new BehaviorSubject<Film[]>([]);
  films$= this._films$.asObservable();

  constructor(protected http:HttpClient, protected authSrv:AuthService)
  {
    authSrv.currentUser$.subscribe(user=>{
      if(user) {
        this.fetch();
      }
      else {
        this._films$.next([]);
      }
    })
  }

  fetch()
  {
    this.http.get<Film[]>(`${enviroment.apiUrl}/films`)
      .subscribe(films=>{
        this._films$.next(films);
      });
  }

  one(id:string)
  {
    return this.http.get<Film>(`${enviroment.apiUrl}/films/${id}`)
  }
}