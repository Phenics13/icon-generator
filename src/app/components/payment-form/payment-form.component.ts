import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  signal,
  SimpleChanges,
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
  PaymentIntentResult,
  StripeElementsOptions,
  StripePaymentElementOptions,
} from '@stripe/stripe-js';
import { MatDividerModule } from '@angular/material/divider';
import { MatInputModule } from '@angular/material/input';
import { PaymentService } from '../../services/payment.service';
import {
  filter,
  map,
  Observable,
  Subject,
  Subscription,
  switchMap,
  take,
  takeUntil,
  withLatestFrom,
} from 'rxjs';
import { selectUser } from '../../reducers/user/user.selectors';
import { Store } from '@ngrx/store';
import { State } from '../../reducers';
import {
  userTopUpCredits,
  userTopUpCreditsFailure,
  userTopUpCreditsSuccess,
  userUpdateCredits,
} from '../../reducers/user/user.actions';
import { CommonModule } from '@angular/common';

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
    CommonModule,
  ],
  templateUrl: './payment-form.component.html',
  styleUrl: './payment-form.component.scss',
})
export class PaymentFormComponent implements OnChanges, OnDestroy {
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() clientSecret: string | undefined = undefined;
  @Input() amount: number = 0;

  @ViewChild(StripePaymentElementComponent)
  paymentElement!: StripePaymentElementComponent;

  readonly stripe = injectStripe(environment.stripe.public);
  stripeSub: Subscription | undefined;

  elementsOptions: StripeElementsOptions = this.paymentService.elementsOptions;
  paymentElementsOptions = this.paymentService.paymentElementsOptions;
  paying = signal(false);

  user$ = this.store.select(selectUser);

  constructor(
    private paymentService: PaymentService,
    private store: Store<State>
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.elementsOptions.clientSecret = this.clientSecret;
  }

  pay() {
    if (this.paying()) return;
    this.paying.set(true);

    if (this.stripeSub) this.stripeSub.unsubscribe();
    this.store.dispatch(userTopUpCredits());

    this.stripeSub = this.user$
      .pipe(
        filter((user) => !!user),
        take(1),
        switchMap((user) => {
          console.log('User found', user);
          return this.stripe
            .confirmPayment({
              elements: this.paymentElement.elements,
              redirect: 'if_required',
            })
            .pipe(map((result: PaymentIntentResult) => ({ result, user })));
        })
      )
      .subscribe(({ result, user }) => {
        console.log('Payment result', result);
        if (result.error) {
          this.store.dispatch(userTopUpCreditsFailure({ error: result.error }));
          this.paymentService.openStripeErrorDialog(result.error);
        } else {
          if (result.paymentIntent.status === 'succeeded') {
            const newCredits =
              user!.credits + result.paymentIntent.amount / 100;

            this.store.dispatch(userTopUpCreditsSuccess());
            this.store.dispatch(
              userUpdateCredits({ user: user!, credits: newCredits })
            );
          }
        }
        this.paying.set(false);
        this.visibleChange.emit(false);
      });
  }

  ngOnDestroy(): void {
    this.stripeSub?.unsubscribe();
  }
}
