import { Global, Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { DatabaseSeeder } from './seeds/database-seeder';
import { UsersSeeder } from './seeds/users-seeder';
import { RolesSeeder } from './seeds/roles-seeder';
import { MenusSeeder } from './seeds/menus-seeder';
import { CatalogueTypesSeeder } from './seeds/catalogueTypes-seeder';

@Global()
@Module({
  providers: [
    ...databaseProviders,
    DatabaseSeeder,
    CatalogueTypesSeeder,
    UsersSeeder,
    RolesSeeder,
    MenusSeeder,
  ],
  exports: [...databaseProviders, DatabaseSeeder],
})
export class DatabaseModule {}
