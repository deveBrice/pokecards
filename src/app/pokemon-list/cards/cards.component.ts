import { Component, computed, input, InputSignal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Pokemon } from '../../../shared/models/pokemon.model';
import { PokemonTypeProperties } from '../../../shared/utils/pokemon.utils';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cards',
  imports: [MatCardModule, CommonModule],
  templateUrl: './cards.component.html',
  styleUrl: './cards.component.scss',
})

export class CardsComponent {
  
   public pokemon = input(new Pokemon());
   

   constructor() {}

   public pokemonTypeIcon = computed(() => {
      return PokemonTypeProperties[this.pokemon().type].imageUrl;
   })

   public backgroundColor = computed(() => {
      return PokemonTypeProperties[this.pokemon().type].color;
   })
}
