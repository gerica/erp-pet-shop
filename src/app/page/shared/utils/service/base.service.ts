import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({ providedIn: 'root' })
export class BaseService {
  private fireCollection: AngularFirestoreCollection<any>;

  constructor(
    private readonly afs: AngularFirestore,
    private storage: AngularFireStorage,
  ) {}

  buscarTodos(objModule: any): Observable<any> {
    this.fireCollection = this.afs.collection<any>(objModule.name);
    return this.fireCollection.valueChanges();
  }

  salvar(objModule: any, entity: any): Promise<void> {
    this.fireCollection = this.afs.collection<any>(objModule.name);
    if (!entity.id) {
      const id = this.afs.createId();
      entity.id = id;
    }
    return this.fireCollection.doc(entity.id).set(entity);
  }

  apagar(objModule: any, id: any): Promise<void> {
    this.fireCollection = this.afs.collection<any>(objModule.name);
    return this.fireCollection.doc(id).delete();
  }

  buscarPorId(objModule: any, id: any): Observable<any> {
    return this.afs
      .collection<any>(objModule.name, ref => ref.where('id', '==', id))
      .valueChanges();
  }

  buscarPorQuery(objModule: any, query: any): Observable<any> {
    return this.afs.collection<any>(objModule.name, query).valueChanges();
  }

  downloadFile(path: string): Observable<string | null> {
    const ref = this.storage.ref(path);
    return ref.getDownloadURL();
  }
}
