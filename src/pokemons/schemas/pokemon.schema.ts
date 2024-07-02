import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export class IUserSchema {
  _id: mongoose.Schema.Types.ObjectId;
  email: string;
}

@Schema()
export class Pokemon {
  @Prop({ required: true })
  _id: string;

  @Prop({ required: true })
  id: number;

  @Prop()
  name: string;

  @Prop()
  height: number;

  @Prop()
  weight: number;

  @Prop()
  attack: number;

  @Prop()
  defense: number;

  @Prop()
  hp: number;

  @Prop()
  special_attack: number;

  @Prop()
  special_defense: number;

  @Prop()
  speed: number;

  @Prop({ required: true })
  type_1: string;

  @Prop()
  type_2: string;

  @Prop({ required: true })
  ability_1: string;

  @Prop()
  ability_2: string;

  @Prop()
  ability_hidden: string;

  @Prop()
  generation_id: number;

  @Prop()
  evolves_from_species_id: number;

  @Prop({ required: true })
  url_image: string;

  @Prop({ type: Object })
  createdBy: IUserSchema;

  @Prop({ type: Object })
  updatedBy: IUserSchema;

  @Prop()
  createdAt: Date;

  @Prop()
  updatedAt: Date;
}

export const PokemonSchema = SchemaFactory.createForClass(Pokemon);
