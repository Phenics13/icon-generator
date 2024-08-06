import { Component } from '@angular/core';
import { ImageListComponent } from '../../components/image-list/image-list.component';

@Component({
  selector: 'app-icons',
  standalone: true,
  imports: [ImageListComponent],
  templateUrl: './icons.component.html',
  styleUrl: './icons.component.scss',
})
export class IconsComponent {}
