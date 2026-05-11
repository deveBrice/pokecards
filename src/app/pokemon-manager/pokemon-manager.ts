import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PokemonType } from '../../shared/utils/pokemon.utils';
import { CardsComponent } from '../pokemon-list/cards/cards.component';
import { Pokemon } from '../../shared/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePokemonConfirmDialog } from '../components/delete-pokemon-confirm-dialog/delete-pokemon-confirm-dialog';

@Component({
  selector: 'app-pokemon-manager',
  imports: [
            CardsComponent, 
            ReactiveFormsModule, 
            MatFormFieldModule, 
            MatSelectModule, 
            MatInputModule, 
            MatButtonModule,
            CommonModule
          ],
  templateUrl: './pokemon-manager.html',
  styleUrl: './pokemon-manager.scss',
})

export class PokemonManager implements OnInit, OnDestroy {
  public pokemonId = signal<number>(-1);
  public routeSubscription: Subscription | null = null;
  public pokemonTypesList: string[] = Object.values(PokemonType);
  private pokemonFormValue: Subscription | null = null;
  public buttonText = input<string>('');

 

  private ar = inject(ActivatedRoute);
  private fb = inject(FormBuilder)
  private router = inject(Router);
  private pokemonService = inject(PokemonService)
  private readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    this.pokemonFormValue = this.pokemonForm.valueChanges.subscribe((data: any) => {
      this.pokemon = Object.assign(new Pokemon(), data)
    })


    this.routeSubscription = this.ar.params.subscribe((params: any) => {
      console.log(params)
      if(params['pokemon-manager']) {
         this.pokemonId.set(parseInt(params['pokemon-manager']))
         const pokemonFound = this.pokemonService.getById(this.pokemonId())
         this.pokemon = pokemonFound;
         this.pokemonForm.patchValue(this.pokemon)
      }
      
    })
  }

  public pokemonForm: FormGroup = this.fb.group({
     name: ['', [Validators.required]],
     type: [PokemonType.ELECTRIC, [Validators.required]],
     hp: ['', [Validators.required, Validators.min(1), Validators.max(200)]],
     imageUrl: ['', [Validators.required]],
     capacityName: ['', [Validators.required]],
     capacityPower: [0, [Validators.required, Validators.min(1), Validators.max(200)]],
     capacityDescription: ['', [Validators.required]]
  })

  public pokemon = Object.assign(new Pokemon(), this.pokemonForm.value)

  public next() {
    let nextId = this.pokemonId() || 0;
    nextId++;
    this.router.navigate(['/pokemon-manager/' + nextId])
  }

  public isFieldValid(fieldname: string) {
    const formControl = this.pokemonForm.get(fieldname);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  public onFileChange(test: any) {
      const reader = new FileReader;
      if(test.target.files && test.target.files.length) {
        const [file] = test.target.files
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.pokemonForm.patchValue({
            imageUrl: reader.result as string
          })
        } 
      }
  }

  public createCard(event: Event) {
    event.preventDefault();
    console.log(this.pokemonId())
    if(this.pokemonId() === -1) {
      this.pokemonService.add(this.pokemon)
      
    } else {
      this.pokemon.id = this.pokemonId();
      this.pokemonService.update(this.pokemon)

    }
    this.back()
  }

  public deletePokemon() {
     const dialogRef = this.dialog.open(DeletePokemonConfirmDialog);
     dialogRef.afterClosed().subscribe((confirm: any) => {
         if(confirm) {
          this.pokemonService.delete(this.pokemonId())
          this.back();
         }
     })
  }

  public back(): void {
    this.router.navigate(['/pokemonList']);
  }

  ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe();
    this.pokemonFormValue?.unsubscribe();
  }
}
