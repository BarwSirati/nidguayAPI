import { IsString } from 'class-validator';

export class CreateBranchDto {
  @IsString()
  name: string;
}
