import { Component, computed, effect, inject, model, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { Pokemon } from '../shared/models/pokemon.model';
import { PokemonService } from '../shared/services/pokemon.service';

@Component({
  selector: 'app-root',
  imports: [CardsComponent, SearchBarComponent],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

  public selectedPokemonIndex = signal(0)
  public pokemon!: Pokemon[];
  public search = model('');

  public pokemonService = inject(PokemonService)

  public filtredPokemon = computed(() => {
    const test = this.pokemon.filter((pokemon: Pokemon) => pokemon.name.includes(this.search()))
    console.log(test)
    return test
  })

  public selectedPokemon = computed(() => {
    return this.pokemon[this.selectedPokemonIndex()];
  })


  constructor() {

    this.pokemon = this.pokemonService.getAll();
     
  }


}
