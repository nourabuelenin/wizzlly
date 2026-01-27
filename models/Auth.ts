export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password_confirm: string;
  first_name?: string;
  last_name?: string;
  phone_number?: string;
  business_name?: string;
  business_industry?: string;
}

export interface LoginData {
  username: string;
  password: string;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  error?: string;
  details?: Record<string, string[]>;
  user?: {
    id: number;
    username: string;
    email: string;
    first_name: string;
    last_name: string;
    phone_number?: string;
    business_name?: string;
    business_industry?: string;
  };
  token?: string;
}
