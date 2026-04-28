import { Routes } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';
import { CardsComponent } from './pokemon-list/cards/cards.component';
import { PokemonManager } from './pokemon-manager/pokemon-manager';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemonList', pathMatch: 'full' },
    { path: 'pokemonList', component: PokemonList },
  
    {
        path: 'pokemon-manager',
        children: [
            {
                path: '',
                component: PokemonManager
            },
            {
                path: ':id',
                component: PokemonManager
            }
        ]
    },

    // {path: '**', component:}
];
