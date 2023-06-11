export interface User {
  given_name: string;
  family_name: string;
  company_name: string;
  email_address: string;
  phone_number: string;

}

export interface Customer {
  id?: string;
  created_at?: string;
  updated_at?: string;
  given_name: string;
  family_name: string;
  email_address: string;
  address: {
    address_line_1: string;
    address_line_2: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: string;
    country: string;
  };
  phone_number: string;
  company_name: string;
  preferences?: {
    email_unsubscribed: boolean;
  };
  creation_source?: string;
  segment_ids?: [
    string,
  ];
  version?: number;

}
