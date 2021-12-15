export interface UserSignIn {
  email: string;
  password: string;
}

export interface UserSignUp extends UserSignIn {
  username: string;
}

export interface UserInfo {
  bio: string;
  email: string;
  image: string;
  token: string;
  username: string;
}

export interface User extends UserInfo {
  favorites: string;
  following: string;
}

export interface UserData {
  user: UserInfo;
}
