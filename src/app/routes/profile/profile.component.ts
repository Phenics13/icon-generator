import { Component, Inject, OnDestroy, signal } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { State } from '../../reducers';
import { userLogOut } from '../../reducers/user/user.actions';
import { CommonModule, DOCUMENT } from '@angular/common';
import {
  selectUser,
  selectUserLoading,
} from '../../reducers/user/user.selectors';
import { selectImages } from '../../reducers/images/images.selectors';
import { LengthPipe } from '../../pipes/length/length.pipe';
import { PaymentFormComponent } from '../../components/payment-form/payment-form.component';
import { PaymentService } from '../../services/payment.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscription } from 'rxjs';
import { UserAccount } from '../../models/user.model';
import { Image } from '../../models/image.model';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

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
    MatProgressSpinnerModule,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
})
export class ProfileComponent implements OnDestroy {
  user$: Observable<UserAccount | null> = this.store.select(selectUser);
  userLoading$: Observable<boolean> = this.store.select(selectUserLoading);
  images$: Observable<Image[]> = this.store.select(selectImages);

  prePaying = signal(false);

  isVisibleTopUp: boolean = false;
  paymentForm: FormGroup = this.paymentService.createPaymentForm();
  clientSecret: string | undefined = undefined;

  topUpSub: Subscription | undefined;

  constructor(
    private store: Store<State>,
    private paymentService: PaymentService
  ) {}

  logoutClick() {
    this.store.dispatch(userLogOut());
  }

  topUpClick(): void {
    if (this.paymentForm.invalid || this.prePaying()) return;
    this.prePaying.set(true);

    const { amount } = this.paymentForm.getRawValue();

    if (this.topUpSub) this.topUpSub.unsubscribe();

    this.topUpSub = this.paymentService.topUp(amount).subscribe((response) => {
      this.prePaying.set(false);

      if (response.error) {
        this.paymentService.openErrorDialog(response.error);
        return;
      }
      this.clientSecret = response.clientSecret;
      this.isVisibleTopUp = true;
    });
  }

  ngOnDestroy(): void {
    this.topUpSub?.unsubscribe();
  }
}
