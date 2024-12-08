export class UserDTO {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  mobileNumber:number
  address: string;
  roleId: number;
}

export class CreateUserDTO extends UserDTO {}
export class UpdateUserDTO extends UserDTO {}