import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { User } from '../models/user.model';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User>;

  constructor(
    private afAuth: AngularFireAuth,
    private afFirestore: AngularFirestore
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afFirestore
            .doc<User>('users/' + user.uid)
            .snapshotChanges()
            .pipe(
              map(a => {
                const data = a.payload.data() as User;
                data.uid = a.payload.id;
                // difference display name according to role
                if (data.role === 1) {
                  data.displayName = 'SADMIN';
                } else if (data.role === 2) {
                  data.displayName = 'ADMIN';
                } else if (data.role === 3 || data.role === 4) {
                  data.displayName = data.name;
                }

                return data;
              })
            );
        } else {
          return of(null);
        }
      })
    );
  }

  // EmailSignIn(email: string, password: string) {
  //   const result = this.afAuth.auth.signInWithEmailAndPassword(email, password);
  // }

  async signOut() {
    await this.afAuth.auth.signOut();
  }

  updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afFirestore.doc(
      'users/${user.id}'
    );

    // const data = {
    //   uid: user.uid,
    //   role: user.role,
    //   name: user.name
    // };

    return userRef.set(user, { merge: true });
  }
}
