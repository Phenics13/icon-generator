import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable, catchError, firstValueFrom, map, of } from 'rxjs';

const TEST_URL =
  'https://oaidalleapiprodscus.blob.core.windows.net/private/org-x41IISle8VNNcOFAqv6ACFtN/user-CbAsLLEOEmkT9PB64OoZlKrt/img-RaEGkU7ZPChRi3hzznrUZMk4.png?st=2024-06-01T13%3A18%3A03Z&se=2024-06-01T15%3A18%3A03Z&sp=r&sv=2023-11-03&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-05-31T23%3A35%3A35Z&ske=2024-06-01T23%3A35%3A35Z&sks=b&skv=2023-11-03&sig=IprZ28sBsKt4t5qcIJBXaz8pRxI1dwal/z1ZV3r%2BKhI%3D';

@Injectable({
  providedIn: 'root',
})
export class CloudinaryService {
  constructor(private http: HttpClient) {}
  private cloudinaryUrl: string = `https://api.cloudinary.com/v1_1/${environment.cloudinary.cloudName}/image/upload`;

  uploadImage(imageUrl: string = TEST_URL): Observable<string> {
    const payload = {
      file: imageUrl,
      upload_preset: environment.cloudinary.uploadPreset,
      cloud_name: environment.cloudinary.cloudName,
    };

    // return firstValueFrom(this.http.post(this.cloudinaryUrl, payload))
    //   .then((res: any) => {
    //     console.log(res.secure_url);
    //     return res.secure_url;
    //   })
    //   .catch((err) => {
    //     console.error(err);
    //   });
    return this.http.post(this.cloudinaryUrl, payload).pipe(
      map((res: any) => {
        console.log(res.secure_url);
        return res.secure_url;
      }),
      catchError((error) => {
        console.error(error);
        return of(error);
      })
    );
  }
}
