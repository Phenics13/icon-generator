import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Color, GenerateIconForm } from '../models/generateForm.model';
import { CloudinaryService } from './cloudinary.service';
import { DalleService } from './dalle.service';
import { Image, ImageResponse, OpenAIResponse } from '../models/image.model';
import { Observable, combineLatest, forkJoin, map, switchMap } from 'rxjs';
import { ImagesService } from './images.service';
import { style } from '@angular/animations';

@Injectable({
  providedIn: 'root',
})
export class GenerateService {
  constructor(
    private formBuilder: FormBuilder,
    private cloudinaryService: CloudinaryService,
    private dalleService: DalleService,
    private imagesService: ImagesService
  ) {}

  createGenerateIconForm(): FormGroup {
    return this.formBuilder.group({
      description: new FormControl('', Validators.required),
      color: new FormControl('#ff0000', [
        Validators.required,
        this.hexColorValidator,
      ]),
      style: new FormControl('', Validators.required),
      quantity: new FormControl(1, [
        Validators.required,
        Validators.min(1),
        Validators.max(10),
      ]),
    });
  }

  hexColorValidator(
    control: AbstractControl
  ): { [key: string]: boolean } | null {
    const hexColorPattern = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
    if (control.value && !hexColorPattern.test(control.value)) {
      return { invalidHexColor: true };
    }
    return null;
  }

  generateImage(generateImageForm: GenerateIconForm): Observable<Image[]> {
    return this.dalleService.generateDalleImage(generateImageForm).pipe(
      switchMap((openAIResponse: OpenAIResponse) => {
        const uploadObservables = openAIResponse.data.map(
          (imageResponse: ImageResponse) => {
            return this.cloudinaryService.uploadImage(imageResponse.url).pipe(
              map((uploadedImageUrl) => ({
                createdAt: openAIResponse.created,
                url: uploadedImageUrl,
                description: generateImageForm.description,
                color: generateImageForm.color,
                style: generateImageForm.style,
              }))
            );
          }
        );

        return forkJoin(uploadObservables);
      })
    );
  }
}

export const COLORS: Color[] = [
  { name: 'Red', hex: '#ff0000' },
  { name: 'Green', hex: '#00ff00' },
  { name: 'Blue', hex: '#0000ff' },
  { name: 'Yellow', hex: '#ffff00' },
  { name: 'Cyan', hex: '#00ffff' },
  { name: 'Magenta', hex: '#ff00ff' },
  { name: 'Black', hex: '#000000' },
  { name: 'White', hex: '#ffffff' },
];
