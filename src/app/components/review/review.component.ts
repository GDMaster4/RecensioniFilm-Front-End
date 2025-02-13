import { Component, Input } from '@angular/core';
import { Review } from '../../entities/review.entity';
import { Router } from '@angular/router';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent
{
  @Input()
  review:Review | null=null;

  constructor(protected router:Router){}

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }

  isReviewFilm() {
    return this.router.url.includes("films") ? true : false;
  }
}