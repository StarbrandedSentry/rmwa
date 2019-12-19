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
  centerCollection: AngularFirestoreCollection<Center>;

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
}
