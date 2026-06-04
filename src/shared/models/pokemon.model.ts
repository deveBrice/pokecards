import { IPokemon } from "../interfaces/pokemon.interface";
import { PokemonType } from "../utils/pokemon.utils";

export class Pokemon implements IPokemon{
    public _id: number = -1;
    public name: string = "Pikachu";
    public imageUrl: string = 'assets/imgs/pikachu_by_pokefan276_dg6ie8f.jpg';
    public type: PokemonType = PokemonType.ELECTRIC;
    public hp: number = 40;
    public num: string = "N°25";
    public capacityName: string = "Géo impact";
    public capacityPower: number = 60;
    public capacityDescription: string = "This is long description of a monster attack. Probably something to do with electricity"

    public copy(): Pokemon {
        return Object.assign(new Pokemon(), this);
    }
    
    // Get data from to server
    public static fromJson(pokemonJson: Pokemon): Pokemon {
        return Object.assign(new Pokemon(), pokemonJson)
    }
    
    // Send data from to Server
    public toJson(): IPokemon {
        const pokemonJson: IPokemon = Object.assign(new Pokemon(), this);
        delete pokemonJson.id;
        return pokemonJson;
    }
}