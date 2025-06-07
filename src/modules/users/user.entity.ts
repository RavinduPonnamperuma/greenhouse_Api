
export class UserDTO {
 id: number;
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

// export class FindUserResponseDto {
//
//   page: number;
//   itemsPerPage: number;
//   totalItems: number;
//   data: CreateUserDTO[];
// }



export class UserLoginDTO{
  email: string;
  password: string;
}
export class LoginResponseDto {
  user: UserDTO;
}