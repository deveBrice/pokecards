import { PokemonType } from "../utils/pokemon.utils";

export interface IPokemon {
    id?: number;
    name: string;
    type: PokemonType;
    hp: number;
    imageUrl: string;
    capacityName: string;
    capacityPower: number;
    capacityDescription: string;
}