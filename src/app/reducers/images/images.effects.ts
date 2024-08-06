import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { ImagesService } from '../../services/images.service';
import { catchError, concatMap, map, mergeMap, of, switchMap, tap } from 'rxjs';
import {
  addImageToUser,
  addImageToUserFailure,
  addImageToUserSuccess,
  generateImage,
  generateImageFailure,
  loadUserImages,
  loadUserImagesFailure,
  loadUserImagesSuccess,
} from './images.actions';
import { GenerateService } from '../../services/generate.service';
import { Image } from '../../models/image.model';
import { userAuthenticated } from '../user/user.actions';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ImagesEffects {
  constructor(
    private actions$: Actions,
    private imagesService: ImagesService,
    private generateService: GenerateService,
    private router: Router
  ) {}

  loadUserImages$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadUserImages, userAuthenticated),
      mergeMap((action) => {
        const userId: string =
          action.type === userAuthenticated.type
            ? action.user.uid
            : action.userId;
        return this.imagesService.getUserImages(userId).pipe(
          map((images) => {
            return loadUserImagesSuccess({ images });
          }),
          catchError((error) => of(loadUserImagesFailure({ error })))
        );
      })
    )
  );

  addImageToUser$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addImageToUser),
      concatMap((action) =>
        this.imagesService.addUserImage(action.user.uid, action.image).pipe(
          map(() => {
            return addImageToUserSuccess({ image: action.image, user: action.user });
          }),
          catchError((error) => of(addImageToUserFailure({ error })))
        )
      ),
      tap(() => { this.router.navigate(['/images']); })
    )
  );

  generateImage$ = createEffect(() =>
    this.actions$.pipe(
      ofType(generateImage),
      switchMap((action) =>
        this.generateService.generateImage(action.generateImageForm).pipe(
          switchMap((images) => {
            return images.map((image) =>
              addImageToUser({ image, user: action.user })
            );
          }),
          catchError((error) => of(generateImageFailure({ error })))
        )
      )
    )
  );
}
