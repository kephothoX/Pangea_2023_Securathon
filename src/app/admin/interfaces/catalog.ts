export interface Catalog {
  type: string;
  id: string;
  updated_at: string;
  created_at: string;
  version: number;
  is_deleted: boolean;
  present_at_all_locations: boolean;
  subscription_plan_data: {
    name: string;
    phases: [
      {
        uid: string;
        cadence: string;
        recurring_price_money: {
          amount: number;
          currency: string;
        };
        ordinal: number;
      }
    ]
  }
}


