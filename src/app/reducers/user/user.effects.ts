import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { UserService } from '../../services/user.service';
import {
  addUserToFirestore,
  addUserToFirestoreFailure,
  addUserToFirestoreSuccess,
  userAuthenticated,
  userCheckAuth,
  userLogInGoogle,
  userLogInGoogleFailure,
  userLogInGoogleSuccess,
  userLogOut,
  userLogOutFailure,
  userLogOutSuccess,
  userNotAuthenticated,
} from './user.actions';
import { catchError, map, of, switchMap } from 'rxjs';
import { UserAccount } from '../../models/user.model';
import { addImageToUserSuccess } from '../images/images.actions';

@Injectable()
export class UserEffects {
  constructor(private actions$: Actions, private userService: UserService) {}

  logInUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogInGoogle),
      switchMap(() =>
        this.userService.logInUser().pipe(
          map((userCredential) => {
            return addUserToFirestore({
              user: this.userService.mapUser(userCredential.user),
            });
          }),
          catchError((error) => of(userLogInGoogleFailure({ error })))
        )
      )
    )
  );

  addUserToFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserToFirestore),
      switchMap(({ user }) =>
        this.userService.addUserToFirestore(user).pipe(
          map(() => {
            return addUserToFirestoreSuccess({ user });
          }),
          catchError((error) => of(addUserToFirestoreFailure({ error })))
        )
      )
    )
  );

  updateCredits$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addImageToUserSuccess),
      switchMap(({ user }) =>
        this.userService.updateUserCredits(user).pipe(
          map(() => {
            const updatedUser = { ...user, credits: user.credits - 1 };
            return userAuthenticated({ user: updatedUser });
          }),
          catchError((error) => of(addUserToFirestoreFailure({ error })))
        )
      )
    )
  );

  getUserFromFirestore$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addUserToFirestoreSuccess),
      switchMap(({ user }) =>
        this.userService.getUserFromFirestore(user).pipe(
          map((userAccount) => {
            return userAuthenticated({ user: userAccount });
          }),
          catchError((error) => of(userLogInGoogleFailure({ error })))
        )
      )
    )
  );

  logOutUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userLogOut),
      switchMap(() =>
        this.userService.logOutUser().pipe(
          map(() => {
            return userLogOutSuccess();
          }),
          catchError((error) => of(userLogOutFailure({ error })))
        )
      )
    )
  );

  checkAuth$ = createEffect(() =>
    this.actions$.pipe(
      ofType(userCheckAuth),
      switchMap(() =>
        this.userService.checkAuth().pipe(
          map((user) => {
            if (user) {
              return addUserToFirestore({
                user: this.userService.mapUser(user),
              });
            } else {
              return userNotAuthenticated();
            }
          })
        )
      )
    )
  );
}
