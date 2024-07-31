import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ImagesState } from "../../models/image.model";

export const selectImagesState = createFeatureSelector<ImagesState>('images');
export const selectImages = createSelector(
  selectImagesState,
  (imagesState) => imagesState.images
);
export const selectImagesLoading = createSelector(
  selectImagesState,
  (imagesState) => imagesState.loading
);
export const selectImagesGenerating = createSelector(
  selectImagesState,
  (imagesState) => imagesState.generating
)