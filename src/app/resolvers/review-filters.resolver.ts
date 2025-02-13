import { ResolveFn } from '@angular/router';
import { ReviewFilters } from '../services/review.service';

export const reviewFiltersResolver: ResolveFn<ReviewFilters> = (route) => {
  return route.queryParams as ReviewFilters;
};