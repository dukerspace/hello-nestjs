import { IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateBlogDto {
  @IsNumber()
  userId: number

  @IsString()
  title: string

  @IsOptional()
  detail?: string
}
