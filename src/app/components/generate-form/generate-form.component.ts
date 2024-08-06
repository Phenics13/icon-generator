import { Component, OnDestroy } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { COLORS, GenerateService } from '../../services/generate.service';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Color } from '../../models/generateForm.model';
import { ColorPickerModule } from 'primeng/colorpicker';
import { ColorboxComponent } from '../colorbox/colorbox.component';
import { Store, select } from '@ngrx/store';
import { State } from '../../reducers';
import { selectUser } from '../../reducers/user/user.selectors';
import { Observable, Subscription } from 'rxjs';
import { UserService } from '../../services/user.service';
import { generateImage } from '../../reducers/images/images.actions';
import { ButtonModule } from 'primeng/button';
import { UserAccount } from '../../models/user.model';
import { MatSelectModule } from '@angular/material/select';
import { selectImagesGenerating } from '../../reducers/images/images.selectors';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-generate-form',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    ColorPickerModule,
    ColorboxComponent,
    ButtonModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './generate-form.component.html',
  styleUrl: './generate-form.component.scss',
})
export class GenerateFormComponent implements OnDestroy {
  colors: Color[] = COLORS;
  generateIconForm: FormGroup = this.generateService.createGenerateIconForm();
  styles = [
    'minimalistic',
    'cartoon',
    'realistic',
    'abstract',
    'flat',
    '3D',
    'pixel',
    'colorful',
    'black and white',
  ];

  user$ = this.store.select(selectUser);
  imagesGenerating$: Observable<boolean> = this.store.select(
    selectImagesGenerating
  );

  userSub: Subscription;
  user: UserAccount | null = null;
  userCredits: number = 0;

  constructor(
    private generateService: GenerateService,
    private userService: UserService,
    private store: Store<State>
  ) {
    this.userSub = this.user$.subscribe((user) => {
      this.user = user || null;
      this.userCredits = user?.credits || 0;
    });
  }

  onColorBoxClick(color: { name: string; hex: string }) {
    this.generateIconForm.get('color')?.setValue(color.hex);
  }

  generateIcon(): void {
    if (!this.user) {
      this.userService.openAuthRequestDialog();
      return;
    }
    if (!this.generateIconForm.valid) {
      console.log(this.generateIconForm);
      return;
    }
    const quantity = this.generateIconForm.value.quantity;
    if (this.userCredits < quantity) {
      this.userService.openNotEnoughCreditsDialog();
      return;
    }
    this.store.dispatch(
      generateImage({
        generateImageForm: this.generateIconForm.value,
        user: this.user,
      })
    );
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
