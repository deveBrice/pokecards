import { Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { PokemonType } from '../utils/pokemon.utils';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  public pokemon: Pokemon[] = [];
  public currentIndex: number = 1;

  constructor() {
    const pokemon = new Pokemon();
     pokemon.name = "Pikachu";
     pokemon.hp = 40;
     pokemon.num = "N°25";
     this.pokemon.push(pokemon)

     const pokemon2 = new Pokemon();
     pokemon2.name = "Carapuce";
     pokemon2.imageUrl = 'https://i.postimg.cc/YC1GCFqc/carapuce.jpg';
     pokemon2.type = PokemonType.WATER;
     pokemon2.hp = 80;
     this.pokemon.push(pokemon2)

     const pokemon3 = new Pokemon();
     pokemon3.name = 'Bulbizarre';
     pokemon3.imageUrl = 'https://i.postimg.cc/CMXzC7RT/bulbizarre.jpg';
     pokemon3.type = PokemonType.PLANT;
     pokemon3.hp = 80;
     this.pokemon.push(pokemon3)

     const pokemon4 = new Pokemon();
     pokemon4.name = 'Salamèche';
     pokemon4.imageUrl = 'https://i.postimg.cc/c45X5Nt9/salameche1.png';
     pokemon4.type = PokemonType.FIRE;
     pokemon4.hp = 80;
     this.pokemon.push(pokemon4)
  }

  public getAll(): Pokemon[] {
    return this.pokemon.map((pokemon: Pokemon) => pokemon.copy());
  }

  public getById(id: number): Pokemon | undefined {
    const pokemon = this.pokemon.find((pokemon: Pokemon) => pokemon.id === id);
    return pokemon ? pokemon.copy() : undefined;
  }

  public add(pokemon: Pokemon) {
    const pokemonCopy = pokemon.copy();
    pokemonCopy.id = this.currentIndex;
    this.pokemon.push(pokemonCopy.copy());
    this.currentIndex++
    return pokemonCopy;
  }

  public update(pokemon: Pokemon): Pokemon {
    const pokemonCopy = pokemon.copy();
    const pokemonIndex = this.pokemon.findIndex((originalPokemon: Pokemon) => originalPokemon.id === pokemon.id);
    if(pokemonIndex != -1) {
      this.pokemon[pokemonIndex] = pokemonCopy.copy()
    }
    return pokemonCopy;
  }

  public delete(id: number): void {
    const pokemonIndex = this.pokemon.findIndex((pokemon: Pokemon) => pokemon.id === id);

    if(pokemonIndex != -1) {
      this.pokemon.splice(pokemonIndex, 1)
    }
  }
}
