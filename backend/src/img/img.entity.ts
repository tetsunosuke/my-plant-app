import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Plant } from '../plants/plant.entity';

@Entity()
export class Img {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Plant, (plant) => plant.id)
  @JoinColumn({ name: 'plant_id' })
  plantId: Plant;

  @Column({ name: 'file_name', nullable: false, comment: 'ファイル名' })
  fileName: string;

  @Column({ name: 'base64_data', nullable: false, comment: 'base64' })
  base64Data: string;

  @CreateDateColumn({
    name: 'uploaded_at',
    nullable: false,
    comment: '作成日時',
  })
  uploadedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, comment: '削除日時' })
  deleteDateAt: Date | null;
}
