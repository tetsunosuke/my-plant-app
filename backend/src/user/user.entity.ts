import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Plant } from '../plants/plant.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'name',
    nullable: false,
    type: 'varchar',
    comment: 'ユーザー名',
  })
  name: string;

  @Column({
    name: 'password',
    nullable: false,
    type: 'varchar',
    comment: 'パスワード',
  })
  password: string;

  @Column({
    name: 'my_img_base64_data',
    nullable: true,
    type: 'varchar',
    comment: 'マイページ写真base64',
  })
  myImgBase64Data: string | null;

  @Column({
    name: 'my_img_file_name',
    nullable: true,
    type: 'varchar',
    comment: 'マイページ写真ファイル名',
  })
  myImgFileName: string | null;

  @OneToMany(() => Plant, (plant) => plant.id)
  plants: Plant[];

  @CreateDateColumn({
    name: 'uploaded_at',
    nullable: false,
    comment: '作成日時',
  })
  uploadedAt: Date;
}
