import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent
{
  films$= this.filmSrv.films$;

  constructor(protected filmSrv: FilmService){}
}