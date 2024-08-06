import { createReducer, on } from '@ngrx/store';
import { UserState } from '../../models/user.model';
import {
  userAuthenticated,
  userCheckAuth,
  userLogInGoogle,
  userLogInGoogleFailure,
  userLogOut,
  userLogOutFailure,
  userLogOutSuccess,
  userTopUpCreditsFailure,
  userTopUpCreditsSuccess,
  userUpdateCredits,
  userUpdateCreditsFailure,
  userUpdateCreditsSuccess,
} from './user.actions';

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
  on(userCheckAuth, (state) => ({
    ...state,
    loading: true,
  })),
  on(userAuthenticated, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(userUpdateCreditsSuccess, (state, { credits }) => ({
    ...state,
    user: {
      ...state.user!,
      credits,
    },
  })),
  on(userUpdateCreditsFailure, (state, { error }) => ({
    ...state,
    error,
  })),
  on(userTopUpCreditsFailure, (state, { error }) => ({
    ...state,
    error,
  }))
);
