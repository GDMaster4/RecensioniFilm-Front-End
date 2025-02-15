import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { catchError, Subject, takeUntil, throwError } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { User } from '../../entities/user.entity';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit, OnDestroy
{
  registerForm = this.fb.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/)]],
    conferma: ['', Validators.required],
  });

  passwError = '';
  protected destroyed$ = new Subject<void>();

  constructor( protected fb: FormBuilder, protected authSrv: AuthService, protected router: Router,
    protected toastSrv:ToastrService
  ) {}

  ngOnInit()
  {
    this.registerForm.valueChanges
      .pipe(
        takeUntil(this.destroyed$)
      )
      .subscribe(() => {
        this.passwError = '';
      });
  }

  ngOnDestroy()
  {
    this.destroyed$.next();
    this.destroyed$.complete();
  }
  
  controllaPassw()
  {
    if(this.registerForm.value.conferma != this.registerForm.value.password) {
      this.passwError="Le password inserite non coincidono";
    }
    else {
      this.passwError="";
    }
  }


  registrazione()
  {
    if (this.registerForm.valid && this.registerForm.value.conferma == this.registerForm.value.password)
    {
      const { username, password,firstName,lastName } = this.registerForm.value;
      const newUser:User= {
        firstName:firstName!,
        lastName:lastName!,
        email:username!,
        password:password!,
      }
      this.authSrv.register(newUser);
      this.toastSrv.success("User registered");
      this.registerForm.reset();
      this.router.navigate(["/login"]);
    }
  }
}