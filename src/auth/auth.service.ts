import { Injectable } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { InjectRepository } from '@nestjs/typeorm'
import * as bcrypt from 'bcrypt'
import { Repository } from 'typeorm'
import { User } from '../users/entities/user.entity'
import { AuthDTO } from './dto/auth.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async validateUser(auth: AuthDTO): Promise<any> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .select('id')
      .addSelect('username')
      .addSelect('first_name as firstName')
      .addSelect('last_name as lastName')
      .addSelect('email')
      .addSelect('password')
      .where('username = :username', { username: auth.username })
      .getRawOne()

    const match = await bcrypt.compare(auth.password, user.password)

    if (user && match) {
      const { password, ...result } = user

      const payload = { username: result.username, sub: user.id }
      const token = this.jwtService.sign(payload)

      return {
        user: result,
        access_token: token
      }
    }
    return null
  }

  async login(user: User) {
    const payload = { username: user.username, sub: user.id }
    return {
      access_token: this.jwtService.sign(payload)
    }
  }
}
