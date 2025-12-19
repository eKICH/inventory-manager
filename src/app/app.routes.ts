import { Routes } from '@angular/router';
import { Inventory } from './components/inventory/inventory';
import { AddInventory } from './components/inventory/add-inventory/add-inventory';
import { ViewInventory } from './components/inventory/view-inventory/view-inventory';

export const routes: Routes = [
    {path: 'inventory', component: Inventory, title: 'Inventory'},
    {path: '', redirectTo: 'inventory', pathMatch: 'full'},
    {path: 'add-inventory', component: AddInventory},
    {path: ':id/edit-inventory', component: AddInventory},
    {path: ':id/:name', component: ViewInventory},
];
