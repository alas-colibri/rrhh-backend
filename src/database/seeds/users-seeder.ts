import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '@auth/dto';
import { RolesService, UsersService } from '@auth/services';
import { RoleEntity } from '@auth/entities';
import { RoleEnum } from '@auth/enums';

@Injectable()
export class UsersSeeder {
  constructor(
    private rolesService: RolesService,
    private usersService: UsersService,
  ) {}

  async run() {
    await this.createUsers();
  }

  async createUsers() {
    const users: CreateUserDto[] = [];
    const roles = (await this.rolesService.findAll()).data as RoleEntity[];
    const adminRole = roles.find((role) => role.code === RoleEnum.ADMIN);
    const humanResourcesRole = roles.find((role) => role.code === RoleEnum.HUMAN_RESORCES);
    // const coordinatorAdministrativeRole = roles.find(
    //   (role) => role.code === RoleEnum.COORDINATOR_ADMINISTRATIVE,
    // );
    // const coordinatorCareerRole = roles.find(
    //   (role) => role.code === RoleEnum.COORDINATOR_CAREER,
    // );

    users.push(
      {
        email: 'admin@gmail.com',
        lastname: 'Perez',
        name: 'Admin',
        password: '12345678',
        passwordChanged: false,
        roles: [adminRole],
        username: 'admin',
      },
      {
        email: 'humanResources@gmail.com',
        lastname: 'Perez',
        name: 'Pepito',
        password: '12345678',
        passwordChanged: false,
        roles: [humanResourcesRole],
        username: 'humanResources',
      },
    );

    for (const user of users) {
      await this.usersService.create(user);
    }
  }
}
