export enum PokemonType {
    PLANT = "plant",
    ELECTRIC = "electric",
    FIRE = "fire",
    WATER = "water"
}

export interface IPokemonProperties {
    imageUrl: string;
    color: string;
}

export const PokemonTypeProperties: { [key: string]: IPokemonProperties } = {
    [PokemonType.PLANT]: {
        imageUrl: 'https://i.postimg.cc/cHgVRSrY/energie-plante.png',
        color: 'rgba(135, 255, 124)',
    },
    //'https://i.postimg.cc/CMXzC7RT/bulbizarre.jpg',
    [PokemonType.ELECTRIC]: {
        imageUrl: 'https://i.postimg.cc/gJc650WC/electric-energy.png',
        color: 'rgba(255, 255, 104)',
    },
    //'https://i.postimg.cc/qRrG70dw/pikachu.jpg'
    [PokemonType.FIRE]: {
        imageUrl: 'https://i.postimg.cc/q7MrCSsX/energie-feu.png',
        color: 'rgba(255, 104, 104)',
    },
    //'https://i.postimg.cc/WzhqNftS/salameche.png'
    [PokemonType.WATER]: {
        imageUrl: 'https://i.postimg.cc/qMXWXQMm/energie-eau.png',
        color: 'rgba(118, 192, 235)',
    },
    //'https://i.postimg.cc/YC1GCFqc/carapuce.jpg'
}