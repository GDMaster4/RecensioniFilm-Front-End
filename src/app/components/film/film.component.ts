import { Component, Input } from '@angular/core';
import { Film } from '../../entities/film.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrl: './film.component.css'
})
export class FilmComponent
{
  @Input()
  film:Film | null=null;

  constructor(protected router:Router){}

  reviewsFilm() {
    this.router.navigate([`films/${this.film!.id}/reviews` ]);
  }
}