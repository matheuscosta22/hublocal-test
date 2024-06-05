import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Companies } from 'src/companies/entities/companies.entity';

@Unique(['email'])
@Entity()
export class Users extends AbstractEntity<Users> {
  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Companies, (company) => company.user, { cascade: false })
  companies: Companies[];
}
