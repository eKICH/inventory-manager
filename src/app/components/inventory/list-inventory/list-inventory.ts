import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe } from '@angular/common';
import { _Inventory } from '../../model/inventory.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { InventoryState } from '../state/inventory.state';
import * as InventorySelectors from '../state/inventory.selectors';
import * as InventoryActions from '../state/inventory.actions';


@Component({
  selector: 'app-list-inventory',
  imports: [AsyncPipe],
  templateUrl: './list-inventory.html',
  styleUrl: './list-inventory.css',
})
export class ListInventory implements OnInit {

  private store = inject(Store<InventoryState>)

  private route: Router = inject(Router);

  inventory$: Observable<_Inventory[]> = this.store.select(InventorySelectors.selectInventory);
  loading$: Observable<boolean> = this.store.select(InventorySelectors.selectInventoryLoading);
  error$: Observable<string | null> = this.store.select(InventorySelectors.selectInventoryError);


  ngOnInit() {

    this.store.dispatch(InventoryActions.loadInventory());

  }

  onViewInventory( id: number, name: string ) {
    console.log(id);
    this.route.navigate([`/${id}/${name}`]);
  }

  onInventoryEdit(id: number) {
    console.log("edit clicked!")
    this.route.navigate([`/${id}/edit-inventory`]);
  }

  onDeleteInventory(id: number) {
    if (!confirm('Are you sure you want to delete this item?')) {
      return;
    }
    this.store.dispatch(InventoryActions.deleteInventory({ id }));
  }

}
