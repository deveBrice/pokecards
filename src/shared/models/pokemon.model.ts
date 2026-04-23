import { PokemonType } from "../utils/pokemon.utils";

export class Pokemon {
    public id: number = -1;
    public name: string = "Pikachu";
    public imageUrl: string = 'assets/imgs/pikachu_by_pokefan276_dg6ie8f.jpg';
    public type: PokemonType = PokemonType.ELECTRIC;
    public hp: number = 40;
    public num: string = "N°25";
    public capacityNmae: string = "Géo impact";
    public capacityPower: number = 60;
    public capacityDescription: string = "This is long description of a monster attack. Probably something to do with electricity"

    public copy(): Pokemon {
        return Object.assign(new Pokemon(), this);
    }
}