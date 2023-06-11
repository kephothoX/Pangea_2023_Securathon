import { Address } from '../../interfaces/address';

export interface Card{
  billing_address: Address;
  cardholder_name: string;
  customer_id: string;
  reference_id: string;
}

export interface BillingCard {
    id: string;
    card_brand: string;
    last_4: number;
    exp_month: number;
    exp_year: number;
    cardholder_name: string;
    billing_address: {
        address_line_1: string;
        address_line_2: string;
        locality: string;
        administrative_district_level_1: string;
        postal_code: string;
        country: string;
    },
    fingerprint: string;
    customer_id: string;
    merchant_id: string;
    enabled: string;
    card_type: string;
    prepaid_type: string;
    bin: number;
    created_at: string;
    version: number;

}


