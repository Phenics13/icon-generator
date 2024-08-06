import { createReducer, on } from "@ngrx/store";
import { ImagesState } from "../../models/image.model";
import { addImageToUser, addImageToUserFailure, addImageToUserSuccess, generateImage, loadUserImages, loadUserImagesFailure, loadUserImagesSuccess } from "./images.actions";

export const initialState: ImagesState = {
  images: [],
  error: null,
  loading: false,
  generating: false,
};

export const imagesReducer = createReducer(
  initialState,
  on(generateImage, (state) => ({
    ...state,
    generating: true,
  })),
  on(loadUserImages, (state) => ({
    ...state,
    loading: true,
  })),
  on(loadUserImagesSuccess, (state, { images }) => ({
    ...state,
    images,
    loading: false,
  })),
  on(loadUserImagesFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
  })),
  on(addImageToUserSuccess, (state, { image }) => ({
    ...state,
    images: [...state.images, image],
    generating: false
  })),
  on(addImageToUserFailure, (state, { error }) => ({
    ...state,
    error,
    generating: false,
  })),
);