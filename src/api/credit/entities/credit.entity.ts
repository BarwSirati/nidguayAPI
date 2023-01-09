import { CourseSubject } from '../../course_subject/entities/course_subject.entity';
import { User } from '../../user/entities/user.entity';
import { NoteType } from '../../../shared/interfaces/note_type.interface';
import { TypeCourse } from '../../../shared/interfaces/type_course.interface';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Education } from 'src/api/education/entities/education.entity';

@Entity('credit')
export class Credit {
  @PrimaryGeneratedColumn()
  id?: number;

  @ManyToOne(() => User, (user) => user.credits)
  @JoinColumn({ name: 'userId' })
  user: User;

  @ManyToOne(() => Education, (education) => education.credits)
  @JoinColumn({ name: 'educationId' })
  education: Education;

  @ManyToOne(() => CourseSubject, (course_subject) => course_subject.id)
  @JoinColumn({ name: 'courseSubjectId' })
  courseSubject: CourseSubject;

  @Column({
    type: 'enum',
    enum: TypeCourse,
    default: null,
  })
  typeCourse: TypeCourse;

  @Column({
    type: 'enum',
    enum: NoteType,
    default: null,
  })
  note: NoteType;
}
