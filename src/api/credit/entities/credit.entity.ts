import { CourseSubject } from 'src/api/course_subject/entities/course_subject.entity';
import { User } from 'src/api/user/entities/user.entity';
import { NoteType } from 'src/shared/interfaces/note_type.interface';
import { TypeCourse } from 'src/shared/interfaces/type_course.interface';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity('credit')
export class Credit {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.credits)
  user: User;

  @ManyToOne(() => CourseSubject, (course_subject) => course_subject.credits)
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
