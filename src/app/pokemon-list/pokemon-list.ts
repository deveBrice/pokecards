import { Component, computed, inject, model, signal } from '@angular/core';
import { CardsComponent } from './cards/cards.component';
import { Pokemon } from '../../shared/models/pokemon.model';
import { PokemonService } from '../../shared/services/pokemon.service';
import { SearchBarComponent } from '../components/search-bar/search-bar.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-pokemon-list',
  imports: [CardsComponent, SearchBarComponent, MatButtonModule],
  templateUrl: './pokemon-list.html',
  styleUrl: './pokemon-list.scss',
})
export class PokemonList {
    
  //public selectedPokemonIndex = signal(0)
  public pokemon = signal<Pokemon[]>([])
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
  }

  /*public selectedPokemon = computed(() => {
    return this.pokemon[this.selectedPokemonIndex()];
  })*/
}
