import { IsNotEmpty } from 'class-validator';

export class CreatePokemonDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  height: number;

  @IsNotEmpty()
  weight: number;

  @IsNotEmpty()
  attack: number;

  @IsNotEmpty()
  defense: number;

  @IsNotEmpty()
  hp: number;

  @IsNotEmpty()
  special_attack: number;

  @IsNotEmpty()
  special_defense: number;

  @IsNotEmpty()
  speed: number;

  @IsNotEmpty()
  type_1: string;

  @IsNotEmpty()
  type_2: string;

  @IsNotEmpty()
  ability_1: string;

  @IsNotEmpty()
  ability_2: string;

  @IsNotEmpty()
  ability_hidden: string;

  @IsNotEmpty()
  generation_id: number;

  @IsNotEmpty()
  evolves_from_species_id: number;

  @IsNotEmpty()
  url_image: string;
}
