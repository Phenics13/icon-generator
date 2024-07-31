import { Component, Input } from '@angular/core';
import { Image } from '../../models/image.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-image-card',
  standalone: true,
  imports: [CardModule, ButtonModule],
  templateUrl: './image-card.component.html',
  styleUrl: './image-card.component.scss',
})
export class ImageCardComponent {
  @Input() image: Image = {} as Image;

  constructor(private http: HttpClient) {}

  downloadImage(url: string) {
    this.http.get(url, { responseType: 'blob' }).subscribe(
      (blob) => {
        // Create a link element
        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = `GeneratedImage.jpg`; // Set the download filename

        // Append link to the body, click it, and then remove it
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      },
      (error) => {
        console.error('Error downloading the image: ', error);
      }
    );
  }
}
