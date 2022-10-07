import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'
import { Blog } from './entities/blog.entity'

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private blogRepository: Repository<Blog>
  ) {}

  async create(data: CreateBlogDto): Promise<Blog> {
    return this.blogRepository.save(data)
  }

  async findAll(page: number, limit: number): Promise<Blog[]> {
    const skip = page == 0 || page == 1 ? 0 : (page - 1) * limit

    return this.blogRepository.find({
      take: limit,
      skip: skip
    })
  }

  findOne(id: number) {
    return this.blogRepository.findOne({ where: { id: id }, relations: ['user'] })
  }

  update(id: number, updateBlogDto: UpdateBlogDto) {
    return `This action updates a #${id} blog`
  }

  remove(id: number) {
    return `This action removes a #${id} blog`
  }
}
