export interface UserDto {
  id?: string;
  login: string;
  password: string;
  phoneNumber: number;
  firstName: string;
  lastname: string;
}
export interface UserPhoneNumberDto {
    phoneNumber: number;
}
