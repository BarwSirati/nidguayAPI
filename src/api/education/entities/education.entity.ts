import { Credit } from '../../credit/entities/credit.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/api/user/entities/user.entity';

@Entity('education')
export class Education {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.educations)
  @JoinColumn({ name: 'userId' })
  user: User;

  @Column()
  year: number;

  @Column()
  semester: number;

  @OneToMany(() => Credit, (credit) => credit.education, { cascade: true })
  @JoinColumn({ name: 'id' })
  credits?: Credit[];
}
