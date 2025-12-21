import { Routes } from '@angular/router';
import { Inventory } from './components/inventory/inventory';
import { AddInventory } from './components/inventory/add-inventory/add-inventory';
import { ViewInventory } from './components/inventory/view-inventory/view-inventory';
import { Confirmation } from './components/shared/confirmation/confirmation';
import { InventoryExistsGuard } from './components/guard/inventory-exists';

export const routes: Routes = [
    {path: 'inventory', component: Inventory, title: 'Inventory'},
    {path: '', redirectTo: 'inventory', pathMatch: 'full'},
    {path: 'add-inventory', component: AddInventory},
    {path: ':id/edit-inventory', component: AddInventory, canActivate: [InventoryExistsGuard]},
    {path: ':id/:name', component: ViewInventory, canActivate: [InventoryExistsGuard]},
    {path: '**', redirectTo:'inventory', pathMatch: 'full'},
];
