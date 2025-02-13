import { Component } from '@angular/core';
import { FilmService } from '../../services/film.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrl: './films.component.css'
})
export class FilmsComponent
{
  films$= this.filmSrv.films$;

  constructor(protected filmSrv: FilmService, protected router: Router,
    protected activatedRoute: ActivatedRoute){}
}