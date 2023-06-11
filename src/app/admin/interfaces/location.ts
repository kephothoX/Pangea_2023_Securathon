export interface Location {
  id?: string;
  merchant_id?: string;
  status?: string;
  timezone?: string;
  language_code?: string;
  mcc?: string;
  name: string;
  capabilities?: string[];
  country?: string;
  created_at?: string;
  currency?: string;
  description: string;
  address: {
    address_line_1: string;
    locality: string;
    administrative_district_level_1: string;
    postal_code: string;
  };
  business_hours: BusinessHours;
  business_name: string;
  business_email: string;
  facebook_url: string;
  instagram_username: string;
  twitter_username: string;
  website_url?: string,
  phone_number: string;
  type: string;
  coordinates: {
    latitude: number;
    longitude: number;
  }

}

export interface BusinessHours {
  periods: Periods;
}

export interface Periods {
  day_of_week: string;
  end_local_time: string;
  start_local_time: string;

}
