import { createAction, props } from '@ngrx/store';
import { UserAccount } from '../../models/user.model';
import { StripeError } from '@stripe/stripe-js';
import { StripePaymentElementComponent } from 'ngx-stripe';

export const userCheckAuth = createAction('[User] Check Auth');
export const userAuthenticated = createAction(
  '[User] Authenticated',
  props<{ user: UserAccount }>()
);
export const userNotAuthenticated = createAction('[User] Not Authenticated');

export const userLogInGoogle = createAction('[User] Log In Google');
export const userLogInGoogleSuccess = createAction(
  '[User] Log In Google Success',
  props<{ user: UserAccount }>()
);
export const userLogInGoogleFailure = createAction(
  '[User] Log In Google Failure',
  props<{ error: Error }>()
);

export const userLogOut = createAction('[User] Log Out');
export const userLogOutSuccess = createAction('[User] Log Out Success');
export const userLogOutFailure = createAction(
  '[User] Log Out Failure',
  props<{ error: Error }>()
);

export const addUserToFirestore = createAction(
  '[User] Add User To Firestore',
  props<{ user: UserAccount }>()
);
export const addUserToFirestoreSuccess = createAction(
  '[User] Add User To Firestore Success',
  props<{ user: UserAccount }>()
);
export const addUserToFirestoreFailure = createAction(
  '[User] Add User To Firestore Failure',
  props<{ error: Error }>()
);

export const userUpdateCredits = createAction(
  '[User] Update User Credits',
  props<{ user: UserAccount; credits: number }>()
);

export const userUpdateCreditsSuccess = createAction(
  '[User] Update User Credits Success',
  props<{ credits: number }>()
);

export const userUpdateCreditsFailure = createAction(
  '[User] Update User Credits Failure',
  props<{ error: Error }>()
);

export const userTopUpCredits = createAction('[User] Top Up User Credits');

export const userTopUpCreditsSuccess = createAction(
  '[User] Top Up User Credits Success'
);

export const userTopUpCreditsFailure = createAction(
  '[User] Top Up User Credits Failure',
  props<{ error: StripeError }>()
);
