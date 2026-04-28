import { Component, computed, effect, inject, model, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';




@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {

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





}
