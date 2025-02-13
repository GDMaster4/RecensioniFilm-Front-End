import { Component, Input } from '@angular/core';
import { Review } from '../../entities/review.entity';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrl: './review.component.css'
})
export class ReviewComponent
{
  @Input()
  review:Review | null=null;

  getStarsArray(rating: number): number[] {
    return Array(rating).fill(0);
  }
}