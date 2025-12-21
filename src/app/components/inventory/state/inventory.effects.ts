import { inject, Injectable } from "@angular/core";
import { _Inventory } from "../../model/inventory.model";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { catchError, from, map, of, switchMap, tap } from "rxjs";
import { ToastService } from "../../services/toast";

import * as InventoryActions from './inventory.actions';
import { InventoryApiService } from "../../services/inventory";

const MOCK_INVENTORY: _Inventory[] = [
    {
        id: '1',
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
        id: '2',
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
    private inventoryApiService = inject(InventoryApiService);

    loadInventory$ = createEffect(() =>

        this.actions$.pipe(

            ofType(InventoryActions.loadInventory),
            switchMap(() =>
                this.inventoryApiService.getAll().pipe(
                    map(inventory => InventoryActions.loadInventorySuccess({ inventory })),
                    catchError(() =>
                        of(InventoryActions.loadInventoryFailure({ error: 'Failed to load inventory' }))
                    )
                )
            )
        )
    );

    loadInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.loadInventoryFailure),
            tap(({ error }) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );



    createInventory$ = createEffect(() =>

        this.actions$.pipe(

            ofType(InventoryActions.createInventory),
                switchMap(({ item }) => {
                    console.log('Effect Triggered', item);
                    return from(this.inventoryApiService.create(item)).pipe(
                        map((newItem) => {
                            console.log('Emmitted');
                            return InventoryActions.createInventorySuccess({ item: newItem });
                        }),
                        catchError(error => {
                            console.log('API Error ', error)
                            return of(InventoryActions.createInventoryFailure({ error: 'Failed to create inventory', }));
                        }
                        )
                    )
                }
            )
        )
    );

    createInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.createInventorySuccess),
            map(() => {
                this.toast.showSuccess('Inventory Created Successfully!');
            })
        ),
        { dispatch: false }
    );

    createInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.createInventoryFailure),
            map(({ error }) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

    updateInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryActions.updateInventory),
            switchMap(({ item }) =>
                from(this.inventoryApiService.update(item)).pipe(
                    map(() =>
                        InventoryActions.updateInventorySuccess({ item })
                    ),
                    catchError(() =>
                        of(InventoryActions.updateInventoryFailure({ error: 'Failure to update inventory', }))
                    )
                )
            )
        )
    );

    updateInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.updateInventorySuccess),
            map(() => {
                this.toast.showSuccess('Inventory Updated Successfully!');
            })
        ),
        { dispatch: false }
    );

    updateInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.updateInventoryFailure),
            map(({ error }) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

    deleteInventory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(InventoryActions.deleteInventory),
            switchMap(({ id }) =>
                from(this.inventoryApiService.delete(id)).pipe(
                    map(() =>
                        InventoryActions.deleteInventorySuccess({ id })
                    ),
                    catchError(() =>
                        of(
                            InventoryActions.deleteInventorFailure({
                                error: 'Failed to delete inventory',
                            })
                        )
                    )
                )
            )
        )
    );

    deleteInventorySuccess$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.deleteInventorySuccess),
            map(() => {
                this.toast.showSuccess('Inventory Deleted Successfully!');
            })
        ),
        { dispatch: false }
    );

    deleteInventoryFailure$ = createEffect(() =>

        this.actions$.pipe(
            ofType(InventoryActions.deleteInventorFailure),
            map(({ error }) => {
                this.toast.showError(error);
            })
        ),
        { dispatch: false }
    );

}

