import { createReducer, on } from "@ngrx/store";
import { initialInventoryState, InventoryState } from "./inventory.state";
import * as inventoryActions from '../state/inventory.actions';

export const inventoryFeatureKey = 'inventory';

export const inventoryReducer = createReducer(
    initialInventoryState,

    on(inventoryActions.loadInventory, (state) => ({
        ...state,
        loading: true,
        error: null
    })),

    on(inventoryActions.loadInventorySuccess, (state, { inventory }) => ({
        ...state,
        inventory,
        loading: false
    })),

    on(inventoryActions.loadInventoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(inventoryActions.createInventory, (state) => ({
        ...state,
        loading: true
    })),

    on(inventoryActions.createInventorySuccess, (state, { item }) => ({
        ...state,
        inventory: [...state.inventory, item],
        loading: false
    })),

    on(inventoryActions.createInventoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(inventoryActions.updateInventorySuccess, (state, { item }) => ({
        ...state,
        inventory: state.inventory.map(i => 
            i.id === item.id ? item : i
        ),
        loading: false
    })),

    on(inventoryActions.updateInventoryFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    })),

    on(inventoryActions.deleteInventory, (state, { id }) => ({
        ...state,
        loading: true
    })),

    on(inventoryActions.deleteInventorySuccess, (state, { id }) =>({
        ...state,
        inventory: state.inventory.filter(
            item => item.id !== id
        ),
        loading: false
    })),
    
    on(inventoryActions.deleteInventorFailure, (state, { error }) => ({
        ...state,
        loading: false,
        error
    }))
);