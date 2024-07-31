import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import {
  userAuthenticated,
  userLogInGoogle,
  userLogInGoogleFailure,
  userLogInGoogleSuccess,
  userLogOut,
  userLogOutFailure,
  userLogOutSuccess,
} from './user.actions';
import { addImageToUserSuccess } from '../images/images.actions';
import { state } from '@angular/animations';

export const initialState: UserState = {
  user: null,
  error: null,
  loading: false,
};

export const userReducer = createReducer(
  initialState,
  on(userLogInGoogle, (state) => ({
    ...state,
    loading: true,
  })),
  on(userLogInGoogleFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(userLogOut, (state) => ({
    ...state,
    loading: true,
  })),
  on(userLogOutSuccess, (state) => ({
    ...state,
    user: null,
    loading: false,
  })),
  on(userLogOutFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(userAuthenticated, (state, { user }) => ({
    ...state,
    user,
  }))
);
