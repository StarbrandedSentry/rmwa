import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Center } from '../models/center.model';
import { map } from 'rxjs/operators';

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
    this.centers$ = this.centerCollection
      .snapshotChanges()
      .pipe(map(actions => actions.map(a => {
        const data =
      })));
  }
}
