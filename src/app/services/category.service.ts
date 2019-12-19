import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Category } from '../models/research.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categories: Category[];
  categories$: Observable<Category[]>;
  categoryCollection: AngularFirestoreCollection<Category>;
  category: AngularFirestoreDocument<Category>;

  constructor(private afFirestore: AngularFirestore) {
    this.categoryCollection = this.afFirestore.collection<Category>(
      'categories',
      ref => ref.orderBy('name', 'asc')
    );
    this.categories$ = this.categoryCollection.snapshotChanges().pipe(
      map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Category;
          data.id = a.payload.doc.id;
          return data;
        })
      )
    );

    this.categories$.subscribe(category => {
      this.categories = category;
    });
  }

  editCategory(name: string, id: string): void {
    const category: Category = {
      name
    };
    this.category = this.afFirestore.doc<Category>('categories/' + id);
    this.category.set(category, { merge: true }).then(result => {
      console.log('Success edit!');
    });
  }

  createCategory(category: Category) {
    category.number = 0;
    this.categoryCollection.add(category).then(result => {
      console.log(result);
    });
  }

  deleteCategory(id: string) {
    this.category = this.afFirestore.doc<Category>('categories/' + id);
    this.category.delete().then(r => {
      console.log(r);
    });
  }
}
