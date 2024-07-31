import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  signal,
  ViewChild,
} from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  injectStripe,
  StripeElementsDirective,
  StripePaymentElementComponent,
} from 'ngx-stripe';
import { environment } from '../../../environments/environment.development';
import {
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { PaymentService } from '../../services/payment.service';

@Component({
  selector: 'app-payment-form',
  standalone: true,
  imports: [
    DialogModule,
    ButtonModule,
    InputTextModule,
    StripeElementsDirective,
    StripePaymentElementComponent,
    FormsModule,
    ReactiveFormsModule,
    MatDividerModule,
    MatInputModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent implements OnInit {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() clientSecret: string | undefined = undefined;

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    // [TODO] make request to a netlify function
    this.elementsOptions.clientSecret = this.clientSecret;
  }

  readonly stripe = injectStripe(environment.stripe.public);
  paying = signal(false);

  checkoutForm = this.paymentService.createPaymentForm();

  pay() {
    if (this.paying() || this.checkoutForm.invalid) return;
    this.paying.set(true);

    this.stripe
      .confirmPayment({
        elements: this.paymentElement.elements,
        redirect: 'if_required',
      })
      .subscribe((result) => {
        this.paying.set(false);
        console.log('Result', result);
        if (result.error) {
          // Show error to your customer (e.g., insufficient funds)
          alert({ success: false, error: result.error.message });
        } else {
          // The payment has been processed!
          if (result.paymentIntent.status === 'succeeded') {
            // Show a success message to your customer
            alert({ success: true });
          }
        }
      });
  }

  elementsOptions = this.paymentService.elementsOptions;
  paymentElementsOptions = this.paymentService.paymentElementsOptions;
}
