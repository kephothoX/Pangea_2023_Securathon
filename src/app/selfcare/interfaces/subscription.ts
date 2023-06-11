export interface Subscription {

  id: string;
  location_id: string;
  plan_id: string;
  customer_id: string;
  start_date: Date;
  charged_through_date: string;
  status: string;
  version: number;
  created_at: string;
  timezone: string;
}
