import { inject, Injectable } from '@angular/core';
import { Pokemon } from '../models/pokemon.model';
import { HttpClient } from '@angular/common/http';
import { IPokemon } from '../interfaces/pokemon.interface';
import { map, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class PokemonService {

  private readonly BASE_URL: string = "http://localhost:3000/api/pokemon/";


  private http = inject(HttpClient);

  public getAll(): Observable<Pokemon[]> {
    return this.http.get<IPokemon[]>(this.BASE_URL).pipe(
      map((pokemonArray: any[]) => {
        return pokemonArray.map(
          (pokemon: Pokemon) => {
            return Pokemon.fromJson(pokemon)
          }
        )
        
      })
    )
   
  }

  public getById(id: string): Observable<Pokemon> {
    return this.http.get<IPokemon>(this.BASE_URL + id).pipe(
      map((pokemon: any) => {
        return Pokemon.fromJson(pokemon)
      })
    )
  }

  public add(pokemon: Pokemon, file: File): Observable<Pokemon> {
 
    const formData = new FormData();

    formData.set('data', JSON.stringify(pokemon.toJson()));
    formData.set('image', file)
    
    return this.http.post<IPokemon>(this.BASE_URL, formData).pipe(
      map((pokemon: any) => {
        console.log(pokemon)
        return Pokemon.fromJson(pokemon)
      })
    )
  }

  public update(pokemon: Pokemon): Observable<Pokemon> {
    return this.http.put(this.BASE_URL + pokemon._id + '/', pokemon.toJson()).pipe(
      map((pokemon: any) => {
        return Pokemon.fromJson(pokemon)
      })
    )
  }

  public delete(id: string): Observable<void> {
    return this.http.delete<void>(this.BASE_URL + id);
  }
}
