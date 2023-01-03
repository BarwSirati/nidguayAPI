import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
@Entity('branch')
export class Branch {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;
}
