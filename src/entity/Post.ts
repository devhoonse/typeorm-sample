import {Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, JoinColumn, ManyToOne} from "typeorm";
import {User} from "./User";


@Entity()
export class Post extends BaseEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @JoinColumn()
  @ManyToOne(type => User, user => user.posts, {onDelete: 'CASCADE'})
  user: User;

}
