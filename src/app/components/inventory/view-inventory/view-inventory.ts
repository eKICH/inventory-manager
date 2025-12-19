import { Component, inject, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { InventoryState } from '../state/inventory.state';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { map, switchMap } from 'rxjs';
import { CurrencyPipe, NgClass } from '@angular/common';
import * as InventorySelectors from '../state/inventory.selectors';
import * as InventoryActions from '../state/inventory.actions';

@Component({
  selector: 'app-view-inventory',
  imports: [CurrencyPipe, RouterLink, NgClass],
  templateUrl: './view-inventory.html',
  styleUrl: './view-inventory.css',
})
export class ViewInventory implements OnInit{

  private store = inject(Store<InventoryState>);
  private activeRoute = inject(ActivatedRoute);
  private route = inject(Router);

  inventoryId = toSignal(
    this.activeRoute.paramMap.pipe(
      map(params => params.get('id'))
    ),
    { initialValue: null }
  );

  inventory = toSignal(
    this.activeRoute.paramMap.pipe(
      map(params => params.get('id')),
      switchMap(id =>
        this.store.select(InventorySelectors.selectInventoryById(id!))
      )
    ),
    { initialValue: null }
  );
  
  ngOnInit(): void {
    this.store.dispatch(InventoryActions.loadInventory());
  }

  goBack() {
    this.route.navigate(['/']);
  }

}
