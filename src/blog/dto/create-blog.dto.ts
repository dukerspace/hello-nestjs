import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateBlogDto {
  @IsNumber()
  user: number

  @IsString()
  title: string

  @IsOptional()
  detail?: string
}
