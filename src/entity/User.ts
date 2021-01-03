import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  OneToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Group } from './Group';
import { Profile } from './Profile';
import { Post } from './Post';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: Date, nullable: true, default: null })
  deletedAt: Date | null;

  @CreateDateColumn()
  createdAt: Date;

  @OneToOne((type) => Profile, (profile) => profile.user)
  profile: Profile;

  @OneToMany((type) => Post, (post) => post.user)
  posts: Post[];

  @ManyToMany((type) => Group, (group) => group.users)
  groups: Group[];
}
