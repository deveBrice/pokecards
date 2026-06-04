import { Component, inject, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from "@angular/material/input";
import { MatButtonModule } from '@angular/material/button';
import { Credentials, LoginService } from '../../shared/services/login.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserModel } from '../../shared/models/user.model';

@Component({
  selector: 'app-login',
  imports: [FormsModule, ReactiveFormsModule, MatFormFieldModule, MatInput, MatButtonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent implements OnDestroy {

  public invalidCredentials: boolean = false;
  private loginSubscription: Subscription | null = null;

  private fb = inject(FormBuilder);
  private loginService = inject(LoginService);
  private router = inject(Router);

   public loginForm: FormGroup = this.fb.group({
     username: ['', [Validators.required]],
     password: ['', [Validators.required]]
   })

   public navigatePokemonList(): void {
      this.router.navigate(['pokemonList']);
   }

   public connect(): void {
      this.loginSubscription = this.loginService.login(this.loginForm.value as Credentials)
      .subscribe({
        next: (result: UserModel | null | undefined) => {
          console.log(result)
           this.navigatePokemonList();
        },
        error: error => {
          this.invalidCredentials = true;
        }
      })
   }

   ngOnDestroy(): void {
     this.loginSubscription?.unsubscribe();
   }
}
