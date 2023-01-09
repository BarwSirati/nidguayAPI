import { Faculty } from '../../faculty/entities/faculty.entity';
import { Branch } from '../../branch/entities/branch.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';
import { CreditInterface } from '../../../shared/interfaces/credit.interface';
import { Credit } from '../../credit/entities/credit.entity';
import { Role } from 'src/shared/interfaces/role.interface';
import { Education } from 'src/api/education/entities/education.entity';

@Entity('user')
export class User {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  lastname: string;

  @Column()
  password: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.users)
  @JoinColumn({ name: 'facultyId' })
  faculty: Faculty;

  @ManyToOne(() => Branch, (branch) => branch.users)
  @JoinColumn({ name: 'branchId' })
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
  credit?: CreditInterface;

  @OneToMany(() => Credit, (credit) => credit.user, { cascade: true })
  @JoinColumn({ name: 'id' })
  credits?: Credit[];

  @OneToMany(() => Education, (education) => education.user, { cascade: true })
  @JoinColumn({ name: 'id' })
  educations?: Education[];

  @Column({
    type: 'enum',
    enum: Role,
    default: Role.User,
  })
  roles?: Role;
}
