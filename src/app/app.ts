import { Component, computed, effect, model, signal } from '@angular/core';
//import { RouterOutlet } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { Pokemon } from '../shared/models/pokemon.model';

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

  public filtredPokemon = computed(() => {
    const test = this.pokemon.filter((pokemon: Pokemon) => pokemon.name.includes(this.search()))
    console.log(test)
    return test
  })

  public selectedPokemon = computed(() => {
    return this.pokemon[this.selectedPokemonIndex()];
  })

  constructor() {

     effect(() => {
      // console.log(this.selectedPokemon())
     })
     this.pokemon = [];

     const pokemon = new Pokemon();
     pokemon.name = "Pikachu";
     pokemon.hp = 40;
     pokemon.num = "N°25";
     this.pokemon.push(pokemon)

    /* const pokemon2 = new Pokemon();
     pokemon2.name = "Pikachu";
     pokemon2.hp = 40;
     pokemon2.num = "N°25";
     this.pokemon.push(pokemon)

     const pokemon3 = new Pokemon();
     pokemon3.name = "Pikachu";
     pokemon3.hp = 40;
     pokemon3.num = "N°25";
     this.pokemon.push(pokemon)

     const pokemon4 = new Pokemon();
     pokemon4.name = "Pikachu";
     pokemon4.hp = 40;
     pokemon4.num = "N°25";
     this.pokemon.push(pokemon)*/
  }


}
