import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import mongoose, { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { compareSync, genSaltSync, hashSync } from 'bcryptjs';
import { IUser } from './users.interface';

@Injectable()
export class UsersService {
  constructor(@Inject('USER_MODEL') private userModel: Model<User>) {}

  getHashPassword = (password: string) => {
    const salt = genSaltSync(10);
    return hashSync(password, salt);
  };

  isValidPassword(password: string, hashPassword: string) {
    return compareSync(password, hashPassword);
  }

  async register(registerUserDto: RegisterUserDto) {
    const isExist = await this.userModel.findOne({
      email: registerUserDto.email,
    });
    if (isExist)
      throw new BadRequestException(
        `Email ${registerUserDto.email} already exists`,
      );

    registerUserDto.password = this.getHashPassword(registerUserDto.password);
    const result = await this.userModel.create(registerUserDto);
    const { password, ...data } = result.toObject();
    return data;
  }

  findOne(id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Not found user with id=${id}`);

    return this.userModel.findOne({ _id: id });
  }

  update(updateUserDto: UpdateUserDto, user: IUser) {
    return this.userModel.findOneAndUpdate({ _id: user._id }, updateUserDto, {
      new: true,
    });
  }

  async remove(user: IUser) {
    const foundUser = await this.userModel.findById(user._id);
    if (foundUser && foundUser.email === 'hanhoa1997@email.com') {
      throw new BadRequestException(`Can not delete admin account`);
    }

    return this.userModel.deleteOne({ _id: user._id });
  }

  updateUserToken(refreshToken: string, id: string) {
    if (!mongoose.Types.ObjectId.isValid(id))
      throw new BadRequestException(`Not found user with id=${id}`);

    return this.userModel.updateOne({ _id: id }, { refreshToken });
  }

  findUserByRefreshToken(refreshToken: string) {
    return this.userModel.findOne({ refreshToken });
  }

  findOneByUserName(username: string) {
    return this.userModel.findOne({ email: username });
  }
}
