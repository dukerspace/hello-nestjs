import { User } from 'src/users/entities/user.entity'
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm'

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number

  @JoinColumn({ name: 'user_id' })
  @ManyToOne(() => User, (user) => user.blogs)
  user: User

  @Column({ length: 255 })
  title: string

  @Column({ type: 'text', nullable: true })
  detail?: string

  @CreateDateColumn({ name: 'created_at' })
  createdAt?: Date

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt?: Date
}
