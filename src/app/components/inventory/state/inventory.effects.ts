import { inject, Injectable } from "@angular/core";
import * as InventoryActions from './inventory.actions';
import { _Inventory } from "../../model/inventory.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of } from "rxjs";

const MOCK_INVENTORY: _Inventory[] = [
    {
            id: 1,
            createAt: '10-09-2025',
            name: 'Jiksu Motor',
            description: 'This is a motor',
            category: 'Engine',
            status: 'Unavailable',
            price: 150.00,
            discount: 0.8,
            quantity: 0
        },
        {
            id: 2,
            createAt: '10-09-2025',
            name: 'Honda Motor',
            description: 'This is a motor',
            category: 'Engine',
            status: 'Available',
            price: 250.00,
            discount: 0.5,
            quantity: 100
        }
]

@Injectable()

export class InventoryEffects {

    private actions$ = inject(Actions);

    loadInventory$ = createEffect(() => 

        this.actions$.pipe(

            ofType(InventoryActions.loadInventory),
            map(() => InventoryActions.loadInventorySuccess({inventory: MOCK_INVENTORY}))
        )
    );

    createInventory$ = createEffect(() => 

        this.actions$.pipe(

            ofType(InventoryActions.createInventory),
            map(({item}) => InventoryActions.createInventorySuccess({item}))

        )
    );

    updateInventory$ = createEffect(() => 
        this.actions$.pipe(
            ofType(InventoryActions.updateInventory),
            map(({item}) => InventoryActions.updateInventorySuccess({ item }))
        )
    );

    deleteInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryActions.deleteInventory),
            map(({id}) => InventoryActions.deleteInventorySuccess({ id }))
        )
    );

}

