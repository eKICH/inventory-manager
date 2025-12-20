import { createAction, props } from "@ngrx/store";
import { _Inventory } from "../../model/inventory.model";

// Loading
export const loadInventory = createAction(
    '[Invetory] Load Inventory'
);

export const loadInventorySuccess = createAction(
    '[Inventory] Load Inventory Success', 
    props<{ inventory: _Inventory[] }>()
);

export const loadInventoryFailure = createAction(
    '[Inventory] Load Inventory Failure', 
    props<{ error: string }>()
);
// End Loading

// Creating
export const createInventory = createAction(
    '[Inventory] Create Inventory',
    props<{item: _Inventory}>()
);

export const createInventorySuccess = createAction(
    '[Inventory] Create Inventory Success',
    props<{item: _Inventory}>()
);

export const createInventoryFailure = createAction(
    '[Inventory] Create Inventory Failure',
    props<{error: string}>()
);
// End Creating

// Updating
export const updateInventory = createAction(
    '[Inventory] Update Inventory',
    props<{item: _Inventory}>()
);

export const updateInventorySuccess = createAction(
    '[Inventory] Update Inventory Success',
    props<{item: _Inventory}>()
);

export const updateInventoryFailure = createAction(
    '[Inventory] Update Inventory Failure',
    props<{error: string}>()
);
// End Updating

// Deleting
export const deleteInventory = createAction(
    '[Inventory] Deleting Inventory',
    props<{ id: number}>()
);

export const deleteInventorySuccess = createAction(
    '[Inventory] Delete Inventory Success',
    props<{ id: number}>()
);

export const deleteInventorFailure = createAction(
    '[Inventory] Delete Inventory Failure',
    props<{error: string}>()
);
// End Deleting