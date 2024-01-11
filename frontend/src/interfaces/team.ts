export interface ITeam {
  id: string;
  name: string;
  description?: string;
  createdBy: string;
  isDeleted: boolean;
}

export interface ICreateTeam extends Omit<ITeam, "id"> {}

export interface IPartialTeam extends Partial<ITeam> {}
