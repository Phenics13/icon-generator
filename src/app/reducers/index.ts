import { isDevMode } from '@angular/core';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer,
} from '@ngrx/store';
import { UserEffects } from './user/user.effects';
import { UserState } from '../models/user.model';
import { userReducer } from './user/user.reducer';
import { ImagesState } from '../models/image.model';
import { imagesReducer } from './images/images.reducer';
import { ImagesEffects } from './images/images.effects';

export interface State {
  user: UserState;
  images: ImagesState;
}

export const reducers: ActionReducerMap<State> = {
  user: userReducer,
  images: imagesReducer,
};

export const effects = [UserEffects, ImagesEffects];

export const metaReducers: MetaReducer<State>[] = isDevMode() ? [] : [];
