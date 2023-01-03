import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('course_subject')
export class CourseSubject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  credit: number;
}
