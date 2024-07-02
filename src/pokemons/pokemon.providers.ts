import { Connection } from 'mongoose';
import { PokemonSchema } from './schemas/pokemon.schema';

export const pokemonsProviders = [
  {
    provide: 'POKEMON_MODEL',
    useFactory: (connection: Connection) =>
      connection.model('Pokemons', PokemonSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];
