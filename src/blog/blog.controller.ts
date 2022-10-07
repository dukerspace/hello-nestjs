import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { BlogService } from './blog.service'
import { CreateBlogDto } from './dto/create-blog.dto'
import { UpdateBlogDto } from './dto/update-blog.dto'

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

  @Post()
  create(@Body() createBlogDto: CreateBlogDto) {
    return this.blogService.create(createBlogDto)
  }

  @Get()
  findAll(@Query('page') page: number, @Query('limit') limit: number) {
    return this.blogService.findAll(page, limit)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.blogService.findOne(+id)
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBlogDto: UpdateBlogDto) {
    return this.blogService.update(+id, updateBlogDto)
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.blogService.remove(+id)
  }
}
