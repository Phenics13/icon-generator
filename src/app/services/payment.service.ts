import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  PaymentIntentResult,
  StripeElementsOptions,
  StripeError,
  StripePaymentElement,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import {
  NetlifyResponse,
  PaymentForm,
  PaymentIntentResponse,
} from '../models/payment.model';
import { HttpClient } from '@angular/common/http';
import { catchError, filter, map, Observable, of, switchMap, take } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../components/message/message.component';
import {
  StripePaymentElementComponent,
  StripeServiceInterface,
} from 'ngx-stripe';
import { selectUser } from '../reducers/user/user.selectors';
import { Store } from '@ngrx/store';
import { State } from '../reducers';

@Injectable({
  providedIn: 'root',
})
export class PaymentService {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    public dialog: MatDialog,
    private store: Store<State>
  ) {}

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
  };

  topUp(amount: number): Observable<PaymentIntentResponse> {
    return this.http
      .post<NetlifyResponse>('/.netlify/functions/create-payment-intent', {
        amount: amount * 100,
      })
      .pipe(
        map((res) => ({
          clientSecret: res.paymentIntent.client_secret,
          error: null,
        })),
        catchError((error) => {
          console.error('Error creating payment intent: ', error);
          return of({ clientSecret: '', error });
        })
      );
  }

  makeStripePayment(
    stripe: StripeServiceInterface,
    paymentElement: StripePaymentElementComponent
  ): Observable<number> {
    return this.store.select(selectUser).pipe(
      filter((user) => !!user),
      take(1),
      switchMap((user) => {
        console.log('User found', user);
        return stripe
          .confirmPayment({
            elements: paymentElement.elements,
            redirect: 'if_required',
          })
          .pipe(
            map((result: PaymentIntentResult) => {
              if (result.error) {
                throw result.error;
              } else {
                const newCredits =
                  user!.credits + result.paymentIntent.amount / 100;
                return newCredits;
              }
            })
          );
      })
    );
  }

  openErrorDialog(error: Error): void {
    this.dialog.open(MessageComponent, {
      width: '400px',
      data: { title: 'Error', description: error.message },
    });
  }

  openStripeErrorDialog(error: StripeError): void {
    this.dialog.open(MessageComponent, {
      width: '400px',
      data: {
        title: 'Payment error',
        description: `${error.type.replace('_', ' ')}
          \n
          ${error.message}
          \n
          \n
          ${error.doc_url}
          `,
      },
    });
  }
}
