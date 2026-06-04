import { Component, computed, effect, inject, model, OnDestroy, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { LoginService } from '../shared/services/login.service';
import { MatButtonModule } from "@angular/material/button";
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatButtonModule, MatToolbarModule, MatIconModule, CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnDestroy {

  public logoutSubscription: Subscription | null = null;

  public loginService = inject(LoginService);
  private router = inject(Router)

  public navigatePokemonList () {
    this.router.navigate(['pokemonList'])
  }

  public navigateToLogin() {
    this.router.navigate(['login'])
  }

  public logout() {
    this.loginService.logout().subscribe({
      next: (_) => {
        console.log('test')
        this.navigateToLogin();
      },
      error: (_) => {
        this.navigateToLogin();
      }
    })
  }

  //public selectedPokemonIndex = signal(0)
  /*public pokemon = signal<Pokemon[]>([])
  public search = model('');

  public pokemonService = inject(PokemonService)

  constructor() {

    this.pokemon.set(this.pokemonService.getAll());

  }

  public filtredPokemon = computed(() => {
    const pokemon = this.pokemon().filter((pokemon: Pokemon) => pokemon.name.includes(this.search()));
    return pokemon
  })

  public addPokemon() {
    const pokemon = new Pokemon();
    this.pokemonService.add(pokemon);
    this.pokemon.set(this.pokemonService.getAll());
  }*/

  /*public selectedPokemon = computed(() => {
    return this.pokemon[this.selectedPokemonIndex()];
  })*/



   ngOnDestroy(): void {
     this.logoutSubscription?.unsubscribe();
   }

}
