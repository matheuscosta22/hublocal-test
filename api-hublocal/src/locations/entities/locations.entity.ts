import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Companies } from 'src/companies/entities/companies.entity';

@Entity()
export class Locations extends AbstractEntity<Locations> {
  @Column()
  name: string;

  @Column()
  zip_code: string;

  @Column()
  street: string;

  @Column()
  number: string;

  @Column()
  district: string;

  @Column()
  city: string;

  @Column()
  state: string;

  @ManyToOne(() => Companies, { onDelete: 'CASCADE' })
  @JoinColumn({
    name: 'company_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_company_id',
  })
  company: number;
}
