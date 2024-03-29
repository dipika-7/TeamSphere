export interface IUser {
  id: number;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  designation: string;
  isDeleted?: boolean;
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
  extends Omit<
    IUser,
    "id" | "username" | "designation" | "isDeleted" | "confirmPassword"
  > {}

export interface IUpdateUser extends Partial<ISignUp> {}
