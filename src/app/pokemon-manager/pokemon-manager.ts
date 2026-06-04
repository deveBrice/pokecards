import { Component, inject, input, OnDestroy, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, of, Subscription, switchMap } from 'rxjs';
import { PokemonType } from '../../shared/utils/pokemon.utils';
import { CardsComponent } from '../pokemon-list/cards/cards.component';
import { Pokemon } from '../../shared/models/pokemon.model';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../../shared/services/pokemon.service';
import { MatDialog } from '@angular/material/dialog';
import { DeletePokemonConfirmDialog } from '../components/delete-pokemon-confirm-dialog/delete-pokemon-confirm-dialog';
import { IPokemon } from '../../shared/interfaces/pokemon.interface';

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

  public pokemonId = signal<string>('');
  public subscription: Subscription = new Subscription();

  public pokemonTypesList: string[] = Object.values(PokemonType);

  public buttonText = input<string>('');
  public fileSetting = signal<any>({});



  private ar = inject(ActivatedRoute);
  private fb = inject(FormBuilder)
  private router = inject(Router);
  private pokemonService = inject(PokemonService)
  private readonly dialog = inject(MatDialog)

  ngOnInit(): void {
    const formValueSubscription = this.pokemonForm.valueChanges.subscribe((data: any) => {
      this.pokemon = Object.assign(new Pokemon(), data)
    })

    this.subscription.add(formValueSubscription)
    const routeSubscription = this.ar.params.pipe(
      switchMap((params: any) => {
        if (params['pokemon-manager']) {
          this.pokemonId.set(params['pokemon-manager'])
          console.log(this.pokemonId())
          return this.pokemonService.getById(this.pokemonId())
        }
        return of(null)
      })
    )

      .subscribe((pokemon: any) => {

        if (pokemon) {

          this.pokemon = pokemon;
          this.pokemonForm.patchValue(this.pokemon)
        }

      })
    this.subscription.add(routeSubscription)
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

  /*public next() {
    let nextId = this.pokemonId() || 0;
    nextId++;
    this.router.navigate(['/pokemon-manager/' + nextId])
  }*/

  public isFieldValid(fieldname: string) {
    const formControl = this.pokemonForm.get(fieldname);
    return formControl?.invalid && (formControl?.dirty || formControl?.touched);
  }

  public onFileChange(picture: any) {
    const reader = new FileReader;
    if (picture.target.files && picture.target.files.length) {
      const [file] = picture.target.files
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.pokemonForm.patchValue({
          imageUrl: reader.result as string
        })
      }
      this.fileSetting.set(file);
    }
  }

  public createCard(event: Event) {
    event.preventDefault();
    let saveObservable = null
    if (this.pokemonId() === '') {
      saveObservable = this.pokemonService.add(this.pokemon, this.fileSetting())
    } else {
      this.pokemon._id = this.pokemonId();
      saveObservable = this.pokemonService.update(this.pokemon)

    }
    const saveSubscription = saveObservable.subscribe(_ => {
      this.back();
    })
    this.subscription.add(saveSubscription)
  }

  public deletePokemon() {
    const dialogRef = this.dialog.open(DeletePokemonConfirmDialog);

    dialogRef.afterClosed().pipe(
      filter((confirm: any) => confirm),
      switchMap(_ => this.pokemonService.delete(this.pokemonId()))
    )
      .subscribe(_ => {

        this.back();
      })
  }

  public back(): void {
    this.router.navigate(['/pokemonList']);
  }

  public defaultPokecardData() {


    this.pokemonForm.patchValue({

      name: "Pikachu",
      // imageUrl: 'assets/imgs/pikachu_by_pokefan276_dg6ie8f.jpg',
      type: PokemonType.ELECTRIC,
      hp: 40,
      num: "N°25",
      capacityName: "Géo impact",
      capacityPower: 60,
      capacityDescription: "This is long description of a monster attack. Probably something to do with electricity"
    })
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
