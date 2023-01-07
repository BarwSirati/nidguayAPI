import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('course_subject')
export class CourseSubject {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  credit: number;
}
