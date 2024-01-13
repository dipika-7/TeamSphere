export interface IUserTeam {
  id: string;
  userId: string;
  teamId: string;
  isDeleted?: boolean;
}

export interface ICreateUserTeam extends Omit<IUserTeam, "id"> {}

export interface IUpdateUserTeam extends Partial<ICreateUserTeam> {}
