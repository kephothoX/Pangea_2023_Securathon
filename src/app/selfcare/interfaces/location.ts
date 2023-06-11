export interface Location {
  id: string;
  name: string;
  address: {
    address_line_1: number;
    address_line_2: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: number;
    country: string;
  },
  timezone: string;
  status: string;
  created_at: string;
  merchant_id: string;
  country: string;
  language_code: string;
  currency: string;
  phone_number: string;
  business_name: string;
  type: string;
  website_url: string;
  business_hours: {
    periods: [
      {
        day_of_week: string;
        start_local_time: string;
        end_local_time: string;
      }
    ]
  },
  business_email: string;
  description: string;
  twitter_username: string;
  instagram_username: string;
  facebook_url: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  mcc: number;
}
