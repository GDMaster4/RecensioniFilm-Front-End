import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { assign } from 'lodash';
import { Subject, takeUntil, filter } from 'rxjs';
import { ReviewFilters } from '../../services/review.service';

@Component({
  selector: 'app-review-filters',
  templateUrl: './review-filters.component.html',
  styleUrl: './review-filters.component.css'
})
export class ReviewFiltersComponent implements OnInit, OnDestroy
{
  filtersForm = this.fb.group({
    text: ['', {updateOn: 'change'} ],
    maxReviews: [5, { updateOn: 'submit', validators: [Validators.min(1)] }]
  });

  @Input()
  set filters(value: ReviewFilters | null)
  {
    const defaultValue = {
      text: '',
      maxReviews:5
    }
    const tmp = assign(defaultValue, value);
    this.filtersForm.patchValue(tmp, {emitEvent: false});
    this.filtersForm.markAsPristine();
  }

  @Output()
  filterChange = new EventEmitter<ReviewFilters>();

  protected destroyed$ = new Subject<void>();

  constructor(protected fb: FormBuilder){}

  ngOnInit(): void
  {
    this.filtersForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$),
        filter(_ => this.filtersForm.valid)
      )
      .subscribe(value => {
        this.filterChange.emit({testo: value.text!, maxReviews: value.maxReviews!});
      });
  }

  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
}