import { Faculty } from 'src/api/faculty/entities/faculty.entity';
import { Branch } from 'src/api/branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreditInterface } from 'src/shared/interfaces/credit.interface';
import { Credit } from 'src/api/credit/entities/credit.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @OneToOne(() => Faculty, (faculty) => faculty.id)
  @JoinColumn()
  faculty: Faculty;

  @OneToOne(() => Branch, (branch) => branch.id)
  @JoinColumn()
  branch: Branch;

  @Column({
    type: 'json',
    default: {
      total: 0,
      gened: {
        basic: 0,
        language: 0,
        faculty: 0,
        elective: 0,
      },
      specific: {
        core: 0,
        specialized: 0,
        options: 0,
        branch_elective: 0,
      },
      free_electives: 0,
    },
  })
  credit: CreditInterface;

  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];
}
