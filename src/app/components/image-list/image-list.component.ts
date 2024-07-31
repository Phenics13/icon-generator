import { Component } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { loadUserImages } from '../../reducers/images/images.actions';
import { selectUser } from '../../reducers/user/user.selectors';
import { Observable, combineLatest, switchMap } from 'rxjs';
import { UserAccount } from '../../models/user.model';
import { user } from '@angular/fire/auth';
import { ImagesService } from '../../services/images.service';
import { Image } from '../../models/image.model';
import {
  selectImages,
  selectImagesLoading,
} from '../../reducers/images/images.selectors';
import { CommonModule } from '@angular/common';
import { ImageCardComponent } from '../image-card/image-card.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-image-list',
  standalone: true,
  imports: [CommonModule, ImageCardComponent, MatProgressSpinnerModule],
  templateUrl: './image-list.component.html',
  styleUrl: './image-list.component.scss',
})
export class ImageListComponent {
  user$: Observable<UserAccount | null> = this.store.select(selectUser);
  userImages$: Observable<Image[]> = this.store.select(selectImages);
  userImagesLoading$: Observable<boolean> =
    this.store.select(selectImagesLoading);

  constructor(
    private store: Store<State>,
    private imagesService: ImagesService
  ) {
    this.user$.subscribe((user) => {
      if (user) {
        this.store.dispatch(loadUserImages({ userId: user.uid }));
      }
    });
  }
}
