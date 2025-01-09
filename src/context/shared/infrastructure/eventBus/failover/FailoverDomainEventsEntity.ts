import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: "failover_domain_events",
  schema: "shared"
})
export default class FailoverDomainEventsEntity {

  @PrimaryGeneratedColumn()
    id: number;

  @Column( "uuid" )
    eventId: string;

  @Column({
    type: "varchar",
    length: 255
  })
    eventName: string;

  @Column( "text" )
    body: string;
}