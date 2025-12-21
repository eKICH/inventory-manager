import { inject, Injectable } from "@angular/core";
import {
  Firestore,
  collection,
  collectionData,
  doc,
  docData,
  setDoc,
  updateDoc,
  deleteDoc,
  runTransaction,
} from '@angular/fire/firestore';
import { Observable } from "rxjs";
import { _Inventory } from "../model/inventory.model";

@Injectable({providedIn: 'root'})

export class InventoryApiService {

    firestore = inject(Firestore);

    private inventoryCollection = collection(this.firestore, 'inventory');
    private counterDoc = doc(this.firestore, 'counters/inventoryCounter');

  getAll(): Observable<_Inventory[]> {
    return collectionData(this.inventoryCollection, { idField: 'id' }) as Observable<_Inventory[]>;
  }

  getById(id: string): Observable<_Inventory> {
    const ref = doc(this.firestore, `inventory/${id}`);
    return docData(ref, {
      idField: 'id',
    }) as Observable<_Inventory>;
  }

  async create(item: _Inventory): Promise<_Inventory> {
    return runTransaction(this.firestore, async transaction => {
      // Get current last ID
      const counterSnap = await transaction.get(this.counterDoc);
      let lastId = 0;

      if (!counterSnap.exists()) {
        console.log('Does not exist!');
        throw new Error('Counter document does not exist');
      } else {
        lastId = counterSnap.data()['lastId'] as number;
      }

      // Generate next numeric ID
      const newId = lastId + 1;

      const newItem: _Inventory = {
        ...item,
        id: newId.toString(),
        createAt: new Date().toISOString()
      }
      
      // Create document
      const itemRef = doc(this.inventoryCollection, newId.toString());
      transaction.set(itemRef, newItem);

      // Update counter
      transaction.set(this.counterDoc, { lastId: newId });

      return newItem; // return the item with generated ID
    });
  }

   update(item: _Inventory): Promise<void> {
    const ref = doc(this.firestore, `inventory/${item.id}`);
    return updateDoc(ref, { ...item });
  }

  delete(id: string): Promise<void> {
    const ref = doc(this.firestore, `inventory/${id}`);
    return deleteDoc(ref);
  }

}