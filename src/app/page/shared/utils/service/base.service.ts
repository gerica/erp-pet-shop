import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const URL_BASE = environment.urlBase;
const SAVE_RETURN_ID = `${URL_BASE}/saveAndReturnId`;
@Injectable({ providedIn: 'root' })
export class BaseService {
  private fireCollection: AngularFirestoreCollection<any>;
  constructor(private readonly afs: AngularFirestore) {}

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
}
