import { _Inventory } from "../../model/inventory.model"

export interface InventoryState {
    inventory: _Inventory[];
    loading: boolean;
    error: string | null;
}

export const initialInventoryState: InventoryState = {
    inventory: [],
    loading: false,
    error: null
}