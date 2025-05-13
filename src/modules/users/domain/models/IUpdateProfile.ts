export interface IUpdateProfile {
  user_id: number;
  name: string;
  email: string;
  password?: string;
  old_password?: string;
}