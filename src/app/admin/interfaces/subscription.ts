export interface Subscription {
  idempotency_key: string;
  location_id: string;
  plan_id: string;
  customer_id: string;
  card_id: string;
  start_date: string;
  tax_percentage: string
  price_override_money: {
    amount: number;
    currency: string;
  };
  timezone: string;
  source: {
   name: string;
  }

}
