import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Center } from '../models/center.model';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class CenterService {
  centers$: Observable<Center[]>;
  centers: Center[];
  admins$: Observable<User[]>;
  admins: User[];
  adminsCollection: AngularFirestoreCollection<User>;
  centerCollection: AngularFirestoreCollection<Center>;
  members$: Observable<User[]>;
  members: User[];
  membersCollection: AngularFirestoreCollection<User>;

  constructor(private afFirestore: AngularFirestore) {
    this.centerCollection = this.afFirestore.collection<Center>(
      'centers',
      ref => ref.orderBy('name', 'asc')
    );
    this.centers$ = this.centerCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Center;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );
    this.centers$.subscribe(center => {
      this.centers = center;
    });
  }

  addCenter(center: Center) {
    return this.centerCollection.add(center);
  }

  addAdmin(centerID: string, user: User) {
    return this.afFirestore
      .doc('centers/' + centerID + '/admins/' + user.uid)
      .set(user, { merge: true });
  }

  getAdmins(centerID: string) {
    this.admins = null;
    this.adminsCollection = this.afFirestore.collection(
      'centers/' + centerID + '/admins'
    );
    this.admins$ = this.adminsCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        })
      )
    );
    this.admins$.subscribe(admins => {
      this.admins = admins;
    });
  }

  addMember(centerID: string, memberID: string, user: User) {
    return this.afFirestore
      .doc('centers/' + centerID + '/members/' + memberID)
      .set(user, { merge: true });
  }

  getMembers(centerID: string) {
    this.membersCollection = this.afFirestore.collection<User>(
      'centers/' + centerID + '/members'
    );
    this.members$ = this.membersCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as User;
          data.uid = a.payload.doc.id;
          return data;
        })
      )
    );
    this.members$.subscribe(member => {
      this.members = member;
    });
  }
}
