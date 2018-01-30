export interface Customer {
  firstname: string;
  lastname: string;
  phoneNumber: string[];
  addresses: Address[];
}

export interface Address {
  street: string;
  city: string;
  state: string;
}
