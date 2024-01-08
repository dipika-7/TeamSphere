export interface IToken {
  id: number;
  token: string;
  tokenType: string;
  userId: string;
}

export interface ICreateToken extends Omit<IToken, "id"> {}
