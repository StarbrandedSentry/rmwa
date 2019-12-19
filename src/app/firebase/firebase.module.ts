import { NgModule } from '@angular/core';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

const Firebase = [AngularFireAuthModule, AngularFirestoreModule];

@NgModule({
  imports: [Firebase],
  exports: [Firebase]
})
export class FirebaseModule {}
