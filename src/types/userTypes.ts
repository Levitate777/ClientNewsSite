export interface IUser {
  id: number,
  login: string,
  email: string,
  avatar: string | null,
}

export interface IUserData {
  login: string,
  password: string,
  email?: string,
}