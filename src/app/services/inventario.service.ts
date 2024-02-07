import { Injectable } from '@angular/core';
import { Firestore, addDoc, collection, collectionData, deleteDoc, doc, docData, getDocs, query, setDoc, updateDoc, where } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {

  private dbPath = '/inventario';

  constructor(private firestore: Firestore) {}

  getAll(): Observable<any> {
    return collectionData(collection(this.firestore, this.dbPath));
  }

  getById(id: any): Observable<any> {
    return docData(doc(this.firestore, this.dbPath + '/' + id));
  }
  

  async add(data: any) {

    await addDoc(collection(this.firestore, this.dbPath), data).then(
      (ref: any) => {
        setDoc(ref, { ...data, id: ref.id });
        return ref;
      }
    );
  }

  getByName(nombre: string): Observable<any> {
    const q = query(collection(this.firestore, this.dbPath), where("nombre", "==", nombre));

    return new Observable((observer) => {
      getDocs(q)
        .then((querySnapshot) => {
            if (querySnapshot.size > 0) {
                const data = querySnapshot.docs.map((doc) => doc.data());
                observer.next(data);
            } else {
                observer.next(null);  // Emitir null si no se encuentra ningún documento
            }
            observer.complete();
        })
        .catch((error) => {
            observer.error(error);
            observer.complete();
        });
    });
  }

  async edit(id: any, data: any) {
    await updateDoc(doc(this.firestore, this.dbPath + '/' + id), data);
  }

  async delete(id: any) {
    await deleteDoc(doc(this.firestore, this.dbPath + '/' + id));
  }
}
