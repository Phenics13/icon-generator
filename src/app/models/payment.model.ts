import { StripeError } from "@stripe/stripe-js";

export interface PaymentForm {
  amount: number;
}

export interface NetlifyResponse {
  paymentIntent: {
    client_secret: string;
  };
}

export interface PaymentIntentResponse {
  clientSecret: string;
  error: Error | null;
}

export interface PaymentState {
  amount: number;
  paying: boolean;
  visiblePaymentForm: boolean;
  error: StripeError | null;
}
