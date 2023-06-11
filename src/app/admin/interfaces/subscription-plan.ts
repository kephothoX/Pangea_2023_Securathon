export interface SubscriptionPlan {
  type: string;
  id: string;
  subscription_plan_data: {
    name: string;
    phases: {
      cadence: string;
      periods: number;
      recurring_price_money: {
        amount: number;
        currency:  string
      }
    }
  }
}

      

