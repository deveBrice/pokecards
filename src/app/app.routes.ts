import { Routes } from '@angular/router';
import { PokemonList } from './pokemon-list/pokemon-list';
import { CardsComponent } from './pokemon-list/cards/cards.component';
import { PokemonManager } from './pokemon-manager/pokemon-manager';
import { LoginComponent } from './login/login.component';
import { isLoggedInGuard } from './guards/is-logged-in-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'pokemonList', pathMatch: 'full' },
    { path: 'pokemonList', component: PokemonList, /*canActivate: [isLoggedInGuard]*/ },

    {path: 'login', component: LoginComponent },
  
    {
        path: 'pokemon-manager',
        children: [
            {
                path: '',
                component: PokemonManager,
                //canActivate: [isLoggedInGuard]
            },
            {
                path: ':pokemon-manager',
                component: PokemonManager,
                //canActivate: [isLoggedInGuard]
            }
        ]
    },

    // {path: '**', component:}
];
