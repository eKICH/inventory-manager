import { Component, inject, OnInit, signal } from '@angular/core';
import { Router } from '@angular/router';
import { AsyncPipe, CurrencyPipe, DatePipe } from '@angular/common';
import { _Inventory } from '../../model/inventory.model';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { InventoryState } from '../state/inventory.state';
import { Confirmation } from '../../shared/confirmation/confirmation';
import * as InventorySelectors from '../state/inventory.selectors';
import * as InventoryActions from '../state/inventory.actions';


@Component({
  selector: 'app-list-inventory',
  imports: [AsyncPipe, DatePipe, CurrencyPipe, Confirmation],
  templateUrl: './list-inventory.html',
  styleUrl: './list-inventory.css',
})
export class ListInventory implements OnInit {

  private store = inject(Store<InventoryState>)

  private route: Router = inject(Router);
  showConfirmation = signal<boolean>(false);
  selectedInventoryId: string | null = null;
  selectedInventoryName: string | null = null;

  inventory$: Observable<_Inventory[]> = this.store.select(InventorySelectors.selectInventory);
  loading$: Observable<boolean> = this.store.select(InventorySelectors.selectInventoryLoading);
  error$: Observable<string | null> = this.store.select(InventorySelectors.selectInventoryError);


  ngOnInit() {

    this.store.dispatch(InventoryActions.loadInventory());

  }

  onViewInventory( id: string, name: string ) {
    this.route.navigate([`/${id}/${name}`]);
  }

  onInventoryEdit(id: string) {
    this.route.navigate([`/${id}/edit-inventory`]);
  }

  openDeleteConfirmation(id: string, name: string){

    this.selectedInventoryId = id;
    this.selectedInventoryName = name;
    this.showConfirmation.set(true);

  }

  confirmDelete() {
    
    if (!this.selectedInventoryId) return;

    this.store.dispatch(InventoryActions.deleteInventory({ id: this.selectedInventoryId }));
    this.closeConfirmation();

  }

  closeConfirmation(): void {
    this.showConfirmation.set(false);
    this.selectedInventoryId = null;
  }

}
