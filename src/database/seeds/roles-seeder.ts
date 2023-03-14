import { Injectable } from '@nestjs/common';
import { RolesService } from '@auth/services';
import { CreateRoleDto } from '@auth/dto';

@Injectable()
export class RolesSeeder {
  constructor(private rolesService: RolesService) {}

  async run() {
    await this.createRoles();
  }

  async createRoles() {
    const roles: CreateRoleDto[] = [];
    roles.push(
      {
        code: 'admin',
        name: 'Administrador',
      },
      {
        code: 'humanResources',
        name: 'Recuros Humanos',
      },
    );

    for (const role of roles) {
      await this.rolesService.create(role);
    }
  }
}
