import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { AbstractEntity } from '../../database/abstract.entity';
import { Users } from 'src/users/entities/users.entity';
import { Locations } from 'src/locations/entities/locations.entity';

@Entity()
export class Companies extends AbstractEntity<Companies> {
  @Column()
  name: string;

  @Column()
  website: string;

  @Column()
  cnpj: string;

  @ManyToOne(() => Users)
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'fk_user_id',
  })
  user: number;

  @OneToMany(() => Locations, (location) => location.company, {
    cascade: true,
  })
  locations: Locations[];
}
