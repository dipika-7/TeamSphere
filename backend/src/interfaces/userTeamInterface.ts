export interface IUesrTeam {
  id: string;
  user_id: string;
  team_id: string;
  isDeleted: boolean;
}

export interface ICreateUserTeam extends Omit<IUesrTeam, "id"> {}

export interface IUpdateUserTeam extends Partial<ICreateUserTeam> {}
