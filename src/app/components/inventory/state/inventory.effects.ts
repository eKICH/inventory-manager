import { inject, Injectable } from "@angular/core";
import { _Inventory } from "../../model/inventory.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, map, of, tap } from "rxjs";
import { ToastService } from "../../services/toast";

import * as InventoryActions from './inventory.actions';

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
    private toast = inject(ToastService);

    loadInventory$ = createEffect(() => 

        this.actions$.pipe(

            ofType(InventoryActions.loadInventory),
            map(() => InventoryActions.loadInventorySuccess({inventory: MOCK_INVENTORY}))
        )
    );

    loadInventoryFailure$ = createEffect(() => 

        this.actions$.pipe(
            ofType(InventoryActions.loadInventoryFailure),
            tap(({error}) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

    

    createInventory$ = createEffect(() => 

        this.actions$.pipe(

            ofType(InventoryActions.createInventory),
            map(({item}) => InventoryActions.createInventorySuccess({item}))

        )
    );

    createInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.createInventorySuccess),
            tap(() => {
                this.toast.showSuccess('Inventory Created Successfully!');
            })
        ),
        { dispatch: false }
    );

    createInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.createInventoryFailure),
            tap(({error}) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

    updateInventory$ = createEffect(() => 
        this.actions$.pipe(
            ofType(InventoryActions.updateInventory),
            map(({item}) => InventoryActions.updateInventorySuccess({ item }))
        )
    );

    updateInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.updateInventorySuccess),
            tap(() => {
                this.toast.showSuccess('Inventory Updated Successfully!');
            })
        ),
        { dispatch: false }
    );

    updateInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.updateInventoryFailure),
            tap(({error}) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

    deleteInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryActions.deleteInventory),
            map(({id}) => InventoryActions.deleteInventorySuccess({ id }))
        )
    );

    deleteInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.deleteInventorySuccess),
            tap(() => {
                this.toast.showSuccess('Inventory Deleted Successfully!');
            })
        ),
        { dispatch: false }
    );

    deleteInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.deleteInventorFailure),
            tap(({error}) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

}

