import { Module } from '@nestjs/common';
import { PokemonsService } from './pokemons.service';
import { PokemonsController } from './pokemons.controller';
import { DatabaseModule } from '../database/database.module';
import { pokemonsProviders } from './pokemon.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [PokemonsController],
  providers: [PokemonsService, ...pokemonsProviders],
})
export class PokemonsModule {}
