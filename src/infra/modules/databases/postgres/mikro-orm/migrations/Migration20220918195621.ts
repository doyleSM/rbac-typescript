import { Migration } from '@mikro-orm/migrations'

export class Migration20220918195621 extends Migration {
  async up (): Promise<void> {
    this.addSql('create table "user_entity" ("id" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "name" varchar(255) not null, "email" varchar(255) not null, "birth" timestamptz(0) not null, "password" varchar(255) not null, "status" text check ("status" in (\'WAITING_CONFIRMATION\', \'ACTIVE\', \'INACTIVE\')) not null, constraint "user_entity_pkey" primary key ("id"));')
    this.addSql('alter table "user_entity" add constraint "user_entity_email_unique" unique ("email");')
  }

  async down (): Promise<void> {
    this.addSql('drop table if exists "user_entity" cascade;')
  }
}
