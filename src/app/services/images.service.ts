import { Injectable } from '@angular/core';
// import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, from } from 'rxjs';
import { Image } from '../models/image.model';
import { Firestore } from '@angular/fire/firestore';
import { addDoc, collection, getDocs } from 'firebase/firestore';

@Injectable({
  providedIn: 'root',
})
export class ImagesService {
  constructor(private firestore: Firestore) {}

  getUserImages(userId: string): Observable<Image[]> {
    const imagesCollectionRef = collection(
      this.firestore,
      `users/${userId}/images`
    );

    return from(
      getDocs(imagesCollectionRef).then((querySnapshot) => {
        // add id to images
        return querySnapshot.docs.map((doc) => doc.data() as Image);
      })
    );
  }

  addUserImage(userId: string, image: Image): Observable<any> {
    const imagesCollectionRef = collection(
      this.firestore,
      `users/${userId}/images`
    );
    return from(addDoc(imagesCollectionRef, image));
  }
}
