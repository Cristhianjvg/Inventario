import { Injectable } from '@angular/core';
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  addDoc,
  setDoc,
  updateDoc,
  deleteDoc,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  private dbPath = '/producto';

  constructor(private firestore: Firestore) {}

  getAll(): Observable<any> {
    
    console.log(collection(this.firestore, this.dbPath));
    return collectionData(collection(this.firestore, this.dbPath));
  }

  getById(id: any): Observable<any> {
    return docData(doc(this.firestore, this.dbPath + '/' + id));
  }

  async add(data: any) {
    console.log('data', data);

    await addDoc(collection(this.firestore, this.dbPath), data).then(
      (ref: any) => {
        setDoc(ref, { ...data, id: ref.id });
        return ref;
      }
    );
  }

  async edit(id: any, data: any) {
    await updateDoc(doc(this.firestore, this.dbPath + '/' + id), data);
  }

  async delete(id: any) {
    await deleteDoc(doc(this.firestore, this.dbPath + '/' + id));
  }


}
