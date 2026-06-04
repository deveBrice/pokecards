import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAnchor } from "@angular/material/button";
import { Router, RouterLink } from "@angular/router";
import { RegisterService } from '../../shared/services/register.service';

@Component({
  selector: 'app-register.component',
  imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatAnchor, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})

export class RegisterComponent {

   
   public fb = inject(FormBuilder);
   private router = inject(Router);
   public registerService = inject(RegisterService);

   public registerForm: FormGroup = this.fb.group({
     firstname: ['', [Validators.required]],
     lastname: ['', [Validators.required]],
     username: ['', [Validators.required]],
     password: ['', [Validators.required]]
   })

   public register() {
     console.log(this.registerForm.value)
     this.registerService.register(this.registerForm.value).subscribe()
     this.router.navigate(['login'])
   }
}
