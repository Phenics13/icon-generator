import { createAction, props } from '@ngrx/store';
import { Image } from '../../models/image.model';
import { GenerateIconForm } from '../../models/generateForm.model';
import { UserAccount } from '../../models/user.model';

export const loadUserImages = createAction(
  '[Images] Load User Images',
  props<{ userId: string }>()
);
export const loadUserImagesSuccess = createAction(
  '[Images] Load User Images Success',
  props<{ images: Image[] }>()
);
export const loadUserImagesFailure = createAction(
  '[Images] Load User Images Failure',
  props<{ error: any }>()
);

export const addImageToUser = createAction(
  '[Images] Add Image',
  props<{ image: Image, user: UserAccount }>()
);
export const addImageToUserSuccess = createAction(
  '[Images] Add Image Success',
  props<{ image: Image, user: UserAccount }>()
);
export const addImageToUserFailure = createAction(
  '[Images] Add Image Failure',
  props<{ error: any }>()
);

export const generateImage = createAction(
  '[Images] Generate Image',
  props<{ generateImageForm: GenerateIconForm, user: UserAccount }>()
);
export const generateImageSuccess = createAction(
  '[Images] Generate Image Success',
  props<{ image: Image }>()
);
export const generateImageFailure = createAction(
  '[Images] Generate Image Failure',
  props<{ error: any }>()
);
