import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query
} from '@nestjs/common'
import { ErrorResponse, ResponseData, ResponsePaginate } from '../utils/response'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto)
  }

  @Get()
  async findAll(
    @Query('page') page: number,
    @Query('limit') limit: number
  ): Promise<ResponsePaginate<User[]> | ErrorResponse> {
    try {
      const result: User[] = await this.usersService.findAll(page || 1, limit || 10)
      const total: number = await this.usersService.count()
      return new ResponsePaginate(true, result, page, limit, total)
    } catch (error) {
      return new ErrorResponse(false, error.message)
    }
  }

  @Get(':id')
  async findOne(
    @Param('id', ParseIntPipe) id: number
  ): Promise<ResponseData<User> | ErrorResponse> {
    try {
      const result = await this.usersService.findOne(id)
      if (!result) {
        throw Error('User not found')
      }
      return new ResponseData(true, result)
    } catch (error) {
      return new ErrorResponse(false, error.message)
    }
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<ResponseData<User> | ErrorResponse> {
    try {
      const result = await this.usersService.findOne(id)
      if (!result) {
        throw Error('User not found')
      }
      await this.usersService.update(id, updateUserDto)
      return new ResponseData(true, result)
    } catch (error) {
      return new ErrorResponse(false, error.message)
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number): Promise<ResponseData<string> | ErrorResponse> {
    try {
      const result = await this.usersService.findOne(id)
      if (!result) {
        throw Error('User not found')
      }
      await this.usersService.remove(id)
      return new ResponseData(true, null, 'delete success')
    } catch (error) {
      return new ErrorResponse(false, error.message)
    }
  }
}
