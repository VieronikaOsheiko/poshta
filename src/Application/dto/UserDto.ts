export interface UserDto {
    id?: string;
    login: string;
    password: string;
    phoneNumber: number;
    firstname: string;
    lastname : string;
    isAdmin: boolean;
  }
export interface UserBalanceDto {
    phoneNumber: number;
  }