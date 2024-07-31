import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { PaymentForm } from '../models/paymentForm.model';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(private formBuilder: FormBuilder) {}

  createPaymentForm(): FormGroup {
    return this.formBuilder.group({
      amount: [
        1,
        [Validators.required, Validators.pattern(/\d+/), this.amountValidator],
      ],
    });
  }

  amountValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== '' && control.value <= 0) {
      return { invalidAmount: true };
    }
    return null;
  }

  elementsOptions: StripeElementsOptions = {
    locale: 'en',
    appearance: {
      theme: 'stripe',
      labels: 'floating',
      variables: {
        colorPrimary: '#673ab7',
      },
    },
  };

  paymentElementsOptions: StripePaymentElementOptions = {
    wallets: {
      applePay: 'auto',
      googlePay: 'auto',
    },
    fields: {
      billingDetails: {
        address: 'never',
      },
    },
  };
}
