import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { hashSync } from 'bcrypt'
import { DeleteResult, Repository } from 'typeorm'

import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>
  ) {}

  async create(data: CreateUserDto): Promise<User> {
    const password = hashSync(data.password, 10)
    const create = {
      ...data,
      password: password
    }
    return this.userRepository.save(create)
  }

  async findAll(page: number, limit: number): Promise<User[]> {
    const skip = page == 0 || page == 1 ? 0 : (page - 1) * limit

    return this.userRepository.find({
      take: limit,
      skip: skip
    })
  }

  async findOne(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id: id } })
  }

  // @todo check password match before update
  async update(id: number, data: UpdateUserDto): Promise<User> {
    const password = hashSync(data.password, 10)
    const update = {
      ...data,
      password: password
    }
    await this.userRepository.update(id, update)
    return this.findOne(id)
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id)
  }

  async count(): Promise<number> {
    return this.userRepository.count()
  }
}
