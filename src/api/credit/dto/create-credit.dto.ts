import {
  IsEnum,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NoteType } from 'src/shared/interfaces/note_type.interface';
import { TypeCourse } from '../../../shared/interfaces/type_course.interface';

export class CreateCreditDto {
  @IsString()
  @MaxLength(8)
  @MinLength(8)
  courseSubjectId: string;

  @IsNumber()
  educationId: number;

  @IsEnum(TypeCourse)
  typeCourse: TypeCourse;

  @IsEnum(NoteType)
  note: NoteType;
}
