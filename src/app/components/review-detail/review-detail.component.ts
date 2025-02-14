import { Component, Input, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subject, takeUntil } from 'rxjs';
import { Review } from '../../entities/review.entity';
import { ReviewService } from '../../services/review.service';
import { FilmService } from '../../services/film.service';

@Component({
  selector: 'app-review-detail',
  templateUrl: './review-detail.component.html',
  styleUrl: './review-detail.component.css'
})
export class ReviewDetailComponent implements OnInit,OnDestroy
{
  @Input()
  review:Review | null=null;

  films$=this.filmSrv.films$;
  tmpRev:Review | null=null;
  revForm=this.fb.group({
    Film:['', Validators.required],
    DataInserimento: [''],
    DataModifica:[''],
    // Autore:['', Validators.required],
    Testo:['', Validators.required],
    Valutazione:[0, Validators.required]
  });
  private destroyed$= new Subject<void>();  
  closeResult = '';

  constructor(protected modalService: NgbModal, protected fb: FormBuilder,
      protected revSrv:ReviewService, protected filmSrv:FilmService) { }

  ngOnInit()
  {
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
    this.tmpRev = {...this.review!}; // Copia i valori originali di this.task in this.tmpTask
    this.revForm.setValue({
      Film:this.tmpRev.Film.id,
      DataInserimento: this.tmpRev.DataInserimento,
      DataModifica: this.tmpRev.DataUltModifica,
      // Autore: this.tmpRev.Autore,
      Testo: this.tmpRev.Testo,
      Valutazione:this.tmpRev.Valutazione
    });
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
  
  updateReview()
  {
    if(this.revForm.valid)
    {
      const {Film,Testo,Valutazione}= this.revForm.value!;
      const updateReview:Partial<Omit<Review, "id" |"DataInserimento" | "DataUltModifica" | "Film" | "Autore">> ={
        Testo:Testo!,
        Valutazione:Valutazione!
      }
      this.revSrv.modify(this.review!.id,updateReview,Film!);
      this.modalService.dismissAll();
      this.revForm.reset();
    }
  }
}