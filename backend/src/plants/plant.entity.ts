import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  DeleteDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Img } from '../img/img.entity';
import { User } from '../user/user.entity';

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    name: 'plant_popular_name',
    nullable: false,
    type: 'varchar',
    comment: '通称',
  })
  plantPopularName: string;

  @Column({ name: 'plant_official_name', nullable: true, comment: '正式名称' })
  plantOfficialName: string | null;

  @Column({
    name: 'plant_family',
    nullable: true,
    comment: '科名',
  })
  plantFamily: string | null;

  @Column({ name: 'possessed', comment: '所持しているか' })
  possessed: boolean;

  @Column({
    name: 'feature_shade_tolerance',
    nullable: true,
    comment: '耐陰性',
  })
  featureShadeTolerance: number | null;

  @Column({
    name: 'feature_drying_tolerance',
    nullable: true,
    comment: '乾燥耐性',
  })
  featureDryingTolerance: number | null;

  @Column({ name: 'feature_cold_tolerance', nullable: true, comment: '耐寒性' })
  featureColdTolerance: number | null;

  @Column({ name: 'feature_heat_tolerance', nullable: true, comment: '耐暑性' })
  featureHeatTolerance: number | null;

  @Column({ name: 'price', nullable: true, comment: '価格' })
  price: number | null;

  @Column({ name: 'purchase_date', nullable: true, comment: '購入日' })
  purchaseDate: Date | null;

  @Column({ name: 'buyer', nullable: true, comment: '購入先' })
  buyer: string | null;

  @Column({ name: 'favorite', nullable: false, comment: 'お気に入り' })
  favorite: boolean;

  @CreateDateColumn({
    name: 'uploaded_at',
    nullable: false,
    comment: '作成日時',
  })
  uploadedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, comment: '削除日時' })
  deleteDateAt: Date | null;

  @ManyToOne(() => User, (user) => user.id)
  @JoinColumn({ name: 'user_id' })
  userId: User;

  @OneToMany(() => Img, (img) => img.plantId)
  images: Img[];
}
