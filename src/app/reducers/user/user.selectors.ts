import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from '../../models/user.model';

export const selectUserState = createFeatureSelector<UserState>('user');
export const selectUser = createSelector(
  selectUserState,
  (userState) => userState.user
);
export const selectUserId = createSelector(selectUser, (user) => user?.uid);
export const selectUserError = createSelector(
  selectUserState,
  (userState) => userState.error
);
export const selectUserLoading = createSelector(
  selectUserState,
  (userState) => userState.loading
);