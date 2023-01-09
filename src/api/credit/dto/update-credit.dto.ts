import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { NoteType } from 'src/shared/interfaces/note_type.interface';
import { TypeCourse } from '../../../shared/interfaces/type_course.interface';
export class UpdateCreditDto {
  @IsString()
  @IsOptional()
  @MaxLength(8)
  @MinLength(8)
  courseSubjectId?: string;

  @IsNumber()
  @IsOptional()
  educationId?: number;

  @IsEnum(TypeCourse)
  @IsOptional()
  typeCourse?: TypeCourse;

  @IsEnum(NoteType)
  @IsOptional()
  note?: NoteType;
}
