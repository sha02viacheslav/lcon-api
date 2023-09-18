import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('lconsummaryreport')
export class LconSummaryReport {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('int')
  sr: number;

  @Column({ nullable: true, length: 50 })
  carrier: string;

  @Column({ nullable: true, length: 255 })
  lconemail: string;

  @Column({ nullable: true, length: 50 })
  lconfirstname: string;

  @Column({ nullable: true, length: 50 })
  lconlastname: string;

  @Column({ nullable: true, length: 50 })
  lconphone: string;

  @Column({ nullable: true, length: 255 })
  alconemail: string;

  @Column({ nullable: true, length: 50 })
  alconfirstname: string;

  @Column({ nullable: true, length: 50 })
  alconlastname: string;

  @Column({ nullable: true, length: 50 })
  alconphone: string;

  @Column({ nullable: true, length: 50 })
  address: string;

  @Column({ nullable: true, length: 50 })
  city: string;

  @Column({ nullable: true, length: 50 })
  state: string;

  @Column('int')
  zip: number;

  @Column({ nullable: true, length: 255 })
  sitename: string;

  @Column({ nullable: true, length: 50 })
  projectmanager: string;

  @Column('int')
  serviceorderid: number;

  @Column({ nullable: true, length: 50 })
  mdr: string;

  @Column({ nullable: true, length: 50 })
  pon: string;

  @Column({ nullable: true, length: 50 })
  transporttype: string;

  @Column({ nullable: true, length: 50 })
  buildingclassification: string;

  @Column({ nullable: true, length: 100 })
  orderacceptancedate: string;

  @Column({ nullable: true, length: 100 })
  firstnotificationdate: string;

  @Column({ nullable: true, length: 100 })
  secondnotificationdate: string;

  @Column({ nullable: true, length: 100 })
  thirdnotificationdate: string;

  @Column({ nullable: true, length: 100 })
  startdate: string;

  @Column({ nullable: true, length: 100 })
  enddate: string;

  @Column({ nullable: true, length: 100 })
  totaltime: string;

  @Column('text')
  status: string;

  @Column('text')
  result: string;

  @Column('text')
  responsetitle: string;

  @Column({ nullable: true, length: 1000 })
  notes: string;

  @Column('text')
  centuryupdate: string;

  @Column({ nullable: true, length: 100 })
  emailresponsedate: string;

  @Column({ nullable: true, length: 50 })
  botusername: string;

  @Column({ nullable: true, length: 50 })
  environment: string;

  @Column({ nullable: true, length: 255 })
  botexecutiondate: string;

  @Column({ nullable: true })
  action: string;

  @Column('text', { nullable: true })
  exceptionmessage: string;

  @Column({ nullable: true, length: 255 })
  cpmemailupdate: string;

  @Column('text', { nullable: true })
  lconconfirmed: string;

  @Column('text', { nullable: true })
  lconchange: string;

  @Column('text', { nullable: true })
  alconchange: string;

  @Column('text', { nullable: true })
  demarcchange: string;
}
