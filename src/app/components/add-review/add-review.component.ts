import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject, takeUntil } from 'rxjs';
import { ReviewService } from '../../services/review.service';
import { Review } from '../../entities/review.entity';
import { FilmService } from '../../services/film.service';
import { Film } from '../../entities/film.entity';

@Component({
  selector: 'app-add-review',
  templateUrl: './add-review.component.html',
  styleUrl: './add-review.component.css'
})
export class AddReviewComponent implements OnInit,OnDestroy
{
  films$= new Observable<Film[]>();
  revForm=this.fb.group({
    Film: ['', Validators.required],
    Testo:['', Validators.required],
    Valutazione:[0, Validators.required]
  });
  private destroyed$= new Subject<void>();  
  closeResult = '';

  constructor(protected modalService: NgbModal, protected fb: FormBuilder,
    protected revSrv:ReviewService, protected filmSrv:FilmService) { }

  ngOnInit()
  {
    this.films$=this.filmSrv.films$;
    this.revForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
  }
  
  ngOnDestroy(): void
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }

  open(content: TemplateRef<any>)
  {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-Titolo' })
    .result.then(
      (result) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      },
    );
  }

  private getDismissReason(reason: any): string
  {
    switch (reason)
    {
      case ModalDismissReasons.ESC:
        return 'by pressing ESC';
      case ModalDismissReasons.BACKDROP_CLICK:
        return 'by clicking on a backdrop';
      default:
        return `with: ${reason}`;
    }
  }

  addReview()
  {
    if(this.revForm.valid)
    {
      const {Film,Testo,Valutazione}= this.revForm.value!;
      const newReview:Partial<Omit<Review, "id" |"DataInserimento" | "DataUltModifica" | "Film" | "Autore">> = {
        Testo:Testo!,
        Valutazione:Valutazione!
      };
      this.revSrv.add(newReview,Film!);
      this.modalService.dismissAll();
      this.revForm.reset();
    }
  }
}