export interface IList {
  id: string;
  title: string;
  teamId: string;
  order: number;
  isDeleted?: boolean;
}

export interface ICreateList extends Omit<IList, "id"> {}

export interface IPartialList extends Partial<IList> {}
