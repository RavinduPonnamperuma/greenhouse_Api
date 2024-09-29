export class UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  address: string;
  roleId: number;
}

export class CreateUserDTO extends UserDTO {}
export class UpdateUserDTO extends UserDTO {}