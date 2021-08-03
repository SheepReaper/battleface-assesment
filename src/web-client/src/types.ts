// Should copy these from an ISO pub. Can't read from DB since this iss static type check
export type Currency = 'EUR' | 'GBP' | 'USD';

// A string of comma separated values is still a string, but here for verbosity
type CSV = string;

interface HasCurrency {
  currency_id: Currency;
}

interface _QuoteCommon extends HasCurrency {
  total: number;
  quotation_id: number;
}

export interface Quote extends _QuoteCommon {
  ages: number[];
  start_date: Date;
  end_date: Date;
  created_at: Date;
}

export interface QuoteRequest extends HasCurrency {
  age: CSV;
  start_date: string;
  end_date: string;
}

export type QuotePostResponse = _QuoteCommon;

export interface User {
  id: number;
  name: string;
  email: string;
  email_verified_at: Date;
  created_at: Date;
  updated_at: Date;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
  user: User;
}
