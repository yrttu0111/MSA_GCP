import { User } from './entities/user.entity';
import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  async findOne({ email }) {
    return await this.userRepository.findOne({ email });
  }
  async create({ email, hashedPassword: password, name}) {
    const user = await this.userRepository.findOne({ email });
    if (user) {
      throw new ConflictException('이미 등록된 이메일 입니다');
    }
    const result = await this.userRepository.save({
      email,
      password,
      name,
    });
    return result;
  }

  //=
  async delete({user}) {
    const result = await this.userRepository.softDelete({email :user.email});
    return result.affected ? true : false;
  }
  async update({user,updateUserInput}) {
    const myUser = await this.userRepository.findOne({where: {email :user.email}});
    const newUser = {...myUser, ...updateUserInput};
    const result = await this.userRepository.save(newUser);
    return result
  }
}
