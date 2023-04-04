import { Injectable } from '@nestjs/common';
import { UsersSeeder } from './users-seeder';
import { RolesSeeder } from './roles-seeder';
import { MenusSeeder } from './menus-seeder';
import { CatalogueTypesSeeder } from './catalogueTypes-seeder';

@Injectable()
export class DatabaseSeeder {
  constructor(
    private catalogueTypeSeeder: CatalogueTypesSeeder,
    private usersSeeder: UsersSeeder,
    private rolesSeeder: RolesSeeder,
    private menusSeeder: MenusSeeder,
  ) {}

  async run() {
    await this.catalogueTypeSeeder.run();
    await this.rolesSeeder.run();
    await this.usersSeeder.run();
    await this.menusSeeder.run();
  }
}
