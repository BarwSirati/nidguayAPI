import { Credit } from 'src/api/credit/entities/credit.entity';
import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';

@Entity('course_subject')
export class CourseSubject {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  credit: number;

  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];
}
