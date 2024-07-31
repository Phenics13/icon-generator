import { Injectable } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { GoogleAuthProvider, signInWithPopup } from '@firebase/auth';
import { Observable, of, switchMap } from 'rxjs';
import { UserCredential } from 'firebase/auth';
import { from } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { MessageComponent } from '../components/message/message.component';
import { User } from '@angular/fire/auth';
import { UserAccount } from '../models/user.model';
import { Store } from '@ngrx/store';
import { State } from '../reducers';
import {
  userAuthenticated,
  userNotAuthenticated,
} from '../reducers/user/user.actions';
import { collection, doc, getDoc, setDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class UserService {
  private provider = new GoogleAuthProvider();

  constructor(
    private auth: Auth,
    private store: Store<State>,
    private firestore: Firestore,
    public dialog: MatDialog
  ) {}

  logInUser(): Observable<UserCredential> {
    return from(signInWithPopup(this.auth, this.provider));
  }

  logOutUser(): Observable<void> {
    return from(signOut(this.auth));
  }

  addUserToFirestore(user: UserAccount): Observable<void | null> {
    const usersCollectionRef = collection(this.firestore, `users`);
    const userDocRef = doc(usersCollectionRef, user.uid);
    return from(getDoc(userDocRef)).pipe(
      switchMap((doc) => {
        if (!doc.exists()) {
          const userAccount: UserAccount = { ...user };
          return from(setDoc(userDocRef, userAccount));
        } else {
          return of(null);
        }
      })
    );
  }

  updateUserCredits(user: UserAccount): Observable<void | null> {
    return this.getUserFromFirestore(user).pipe(
      switchMap((userAccount) => {
        const newUserAccount = { ...userAccount, credits: userAccount.credits - 1 };
        const usersCollectionRef = collection(this.firestore, `users`);
        const userDocRef = doc(usersCollectionRef, userAccount.uid); 
        return from(setDoc(userDocRef, newUserAccount));
      })
    );
  }

  getUserFromFirestore(userAccount: UserAccount): Observable<UserAccount> {
    const usersCollectionRef = collection(this.firestore, `users`);
    const userDocRef = doc(usersCollectionRef, userAccount.uid);
    return from(getDoc(userDocRef)).pipe(
      switchMap((doc) => {
        return of(doc.data() as UserAccount);
      })
    );
  }

  checkAuth(): Observable<User | null> {
    return new Observable((observer) => {
      this.auth.onAuthStateChanged((user) => {
        if (user) {
          observer.next(user);
        } else {
          observer.next(null);
        }
      });
    });
  }

  openAuthRequestDialog(): void {
    this.dialog.open(MessageComponent, {
      width: '400px',
      data: {
        title: 'Auth Request',
        description: 'Please sign in to continue',
      },
    });
  }

  openNotEnoughCreditsDialog(): void {
    this.dialog.open(MessageComponent, {
      width: '400px',
      data: {
        title: 'Not Enough Credits',
        description: 'Please purchase more credits to continue',
      },
    });
  }

  mapUser(user: User): UserAccount {
    const { uid, displayName, email, photoURL } = user;
    const credits = 0;
    return { uid, displayName, email, photoURL, credits } as UserAccount;
  }
}
