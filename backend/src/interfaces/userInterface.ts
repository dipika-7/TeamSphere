export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  designation: string;
  isDeleted: boolean;
}

export interface IToken {
  refreshToken: string;
}

export interface IPassword {
  oldPassword: string;
  newPassword: string;
}

export interface ISignUp extends Omit<IUser, "id"> {}

export interface ILogin
  extends Omit<IUser, "id" | "username" | "designation" | "isDeleted"> {}

export interface IUpdateUser extends Partial<ISignUp> {}

// export interface GetAllUsersQuery extends PaginationQuery {
//   name?: string;
// }
