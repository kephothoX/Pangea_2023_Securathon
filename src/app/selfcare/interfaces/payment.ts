export interface Payment {
  location_id: string | null;
  source_id: string | null;
  verification_token: string | null;
  idempotency_key: string;
  autocomplete: boolean;
  note: string;
  customer_id: string;
  amount_money: {
    amount: number;
    currency: string;
  },
}
