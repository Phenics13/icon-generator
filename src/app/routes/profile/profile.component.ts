import { Component, Inject } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { State } from '../../reducers';
import { userLogOut } from '../../reducers/user/user.actions';
import { CommonModule, DOCUMENT } from '@angular/common';
import { selectUser } from '../../reducers/user/user.selectors';
import { selectImages } from '../../reducers/images/images.selectors';
import { LengthPipe } from '../../pipes/length/length.pipe';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { PaymentService } from '../../services/payment.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    CardModule,
    LengthPipe,
    PaymentFormComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent {
  user$ = this.store.pipe(select(selectUser));
  images$ = this.store.pipe(select(selectImages));

  isVisibleTopUp: boolean = false;
  paymentForm: FormGroup = this.paymentService.createPaymentForm();
  clientSecret: string | undefined = undefined;

  constructor(
    private store: Store<State>,
    @Inject(DOCUMENT) private document: Document,
    private paymentService: PaymentService,
    private http: HttpClient
  ) {}

  logoutClick() {
    this.store.dispatch(userLogOut());
  }

  topUpClick(): void {
    console.log('works');
    if (this.paymentForm.invalid) return;

    const { amount } = this.paymentForm.getRawValue();

    this.http
      .post<NetlifyResponse>('/.netlify/functions/create-payment-intent', {
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ amount: amount * 100 }),
      })
      .pipe(map((res) => res.paymentIntent.client_secret))
      .subscribe((client_secret) => {
        this.clientSecret = client_secret;
        this.isVisibleTopUp = true;
      });

    // const response = await fetch('/.netlify/functions/create-payment-intent', {
    //   method: 'post',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ amount: amount * 100 }),
    // }).then((res) => res.json());

    // const {
    //   paymentIntent: { client_secret },
    // } = response;

    // this.clientSecret = client_secret;
  }
}

export interface NetlifyResponse {
  paymentIntent: {
    client_secret: string;
  };
}
