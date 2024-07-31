export interface UserAccount {
  uid: string;
  displayName: string;
  email: string;
  photoURL: string;
  credits: number;
}

export interface UserState {
  user: UserAccount | null;
  error: any;
  loading: boolean;
}