import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-pokemon-manager',
  imports: [],
  templateUrl: './pokemon-manager.html',
  styleUrl: './pokemon-manager.scss',
})
export class PokemonManager implements OnInit, OnDestroy {
  public pokemonId = signal<number | undefined>(undefined);
  public routeSubscription: Subscription | null = null;

   private ar = inject(ActivatedRoute);
   private router = inject(Router);

   ngOnInit(): void {
     this.routeSubscription = this.ar.params.subscribe((params: any) => {
        this.pokemonId.set(params['id'] ? parseInt(params['id']) : undefined)
     })
     
   }

   public next() {
     let nextId = this.pokemonId() || 0;
     nextId++;
     this.router.navigate(['/pokemon-manager/' + nextId])
   }

   ngOnDestroy(): void {
    this.routeSubscription?.unsubscribe() 
   }
}
