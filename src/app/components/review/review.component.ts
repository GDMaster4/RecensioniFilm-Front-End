import { Component, Input } from '@angular/core';
import { Review } from '../../entities/review.entity';
import { Router } from '@angular/router';
import { User } from '../../entities/user.entity';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent
{
  @Input()
  review:Review | null=null;

  @Input()
  currentUser:User | null = null;

  constructor(protected router:Router){}

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  isReviewFilm() {
    return this.router.url.includes("films") ? true : false;
  }

  isCurrentUserAutor() {
    return this.currentUser!.id! == this.review!.Autore.id! ? true : false;
  }
}