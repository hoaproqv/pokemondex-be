import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import mongoose, { Model } from 'mongoose';
import aqp from 'api-query-params';
import { IUser } from '../users/users.interface';
import { Pokemon } from './schemas/pokemon.schema';

@Injectable()
export class PokemonsService {
  constructor(@Inject('POKEMON_MODEL') private pokemonModel: Model<Pokemon>) {}

  create(createPokemonDto: CreatePokemonDto) {
    return this.pokemonModel.create(createPokemonDto);
  }

  async findAll(currentPage: number, limit: number, qs: string) {
    const { filter, sort, population } = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    const offset = (currentPage - 1) * limit;
    const totalItems = (await this.pokemonModel.find(filter)).length;
    const totalPages = Math.ceil(totalItems / limit);

    const result = await this.pokemonModel
      .find(filter)
      .skip(offset)
      .limit(limit)
      .sort(sort as any)
      .populate(population)
      .exec();

    return {
      meta: {
        current: currentPage,
        pageSize: limit,
        pages: totalPages,
        total: totalItems,
      },
      result,
    };
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Not found pokemon with id=${id}`);

    return this.pokemonModel.findById(id);
  }

  update(id: string, updatePokemonDto: UpdatePokemonDto, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Not found pokemon with id=${id}`);

    return this.pokemonModel.findOneAndUpdate(
      { _id: id },
      {
        ...updatePokemonDto,
        updatedBy: {
          _id: user._id,
          email: user.email,
        },
      },
      {
        new: true,
      },
    );
  }

  remove(id: string, user: IUser) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Not found pokemon with id=${id}`);

    if (user.role === 'ADMIN') {
      return this.pokemonModel.deleteOne({ _id: id });
    } else {
      throw new BadRequestException(
        `You don't have permission to delete this pokemon`,
      );
    }
  }
}
