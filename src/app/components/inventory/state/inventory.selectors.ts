import { createFeatureSelector, createSelector } from "@ngrx/store";
import { inventoryFeatureKey } from "./inventory.reducer";
import { InventoryState } from "./inventory.state";

export const selectInventoryFeature = createFeatureSelector<InventoryState>(inventoryFeatureKey);
export const selectInventory = createSelector(selectInventoryFeature, (state: InventoryState) => state.inventory);
export const selectInventoryLoading = createSelector(selectInventoryFeature, (state: InventoryState) => state.loading);
export const selectInventoryLoaded = createSelector(selectInventoryFeature, (state: InventoryState) => state.loaded);
export const selectInventoryError = createSelector(selectInventoryFeature, (state: InventoryState) => state.error);

export const selectInventoryById = (id: string) => 
    createSelector(selectInventoryFeature, (state: InventoryState) => state.inventory.find((item) => item.id?.toString() === id)
);