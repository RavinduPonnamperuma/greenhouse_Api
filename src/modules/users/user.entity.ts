export class UserDTO {

  userName: string;
  name: string;
  email: string;
  address: string;
  password: string;
  contact: string;
  status: string;
  role: string;
}

export class CreateUserDTO extends UserDTO {}
export class UpdateUserDTO extends UserDTO {}

export class UserLoginDTO{
  email: string;
  password: string;
}