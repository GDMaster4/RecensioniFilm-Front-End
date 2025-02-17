import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Observable } from 'rxjs';
import { Film } from '../../entities/film.entity';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent
{
  films$= new Observable<Film[]>();

  constructor(protected filmSrv: FilmService, protected authSrv:AuthService)
  {
    filmSrv.fetch();
    this.films$= filmSrv.films$;
  }
}