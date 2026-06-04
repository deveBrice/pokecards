import { Component, computed, inject, model, signal } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-list',
  imports: [CardsComponent, SearchBarComponent, MatButtonModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
    
  //public selectedPokemonIndex = signal(0)
  
  public search = model('');
  public actionTextManager = signal<string>('');
  

  private pokemonService = inject(PokemonService);
  private router = inject(Router);
  public pokemon = toSignal(this.pokemonService.getAll())

  constructor() {}

  public filtredPokemon = computed(() => {
    const pokemon = this.pokemon()?.filter((pokemon: Pokemon) => pokemon.name.includes(this.search())) ?? [];
    return pokemon
  })

  public addPokemon() {
    this.router.navigate(['/pokemon-manager'])
  }

  public selectedPokeCard(pokemon: Pokemon) {
   // console.log(pokemon)
    this.router.navigate(['/pokemon-manager/', pokemon._id])
  }

  /*public selectedPokemon = computed(() => {
    return this.pokemon[this.selectedPokemonIndex()];
  })*/
}
