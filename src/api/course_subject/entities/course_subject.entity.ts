import { Credit } from 'src/api/credit/entities/credit.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_subject')
export class CourseSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  credit: number;

  @OneToMany(() => Credit, (credit) => credit.user)
  credits: Credit[];
}
