export interface ICard {
  id: string;
  title: string;
  description: string;
  status?: string;
  deadline: string;
  priority: number;
  assignedTo: string;
  listId: string;
  isDeleted?: boolean;
}

export interface ICreateCard extends Omit<ICard, "id"> {}

export interface IUpdateCard extends Partial<ICreateCard> {}
