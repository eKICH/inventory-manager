import { Routes } from '@angular/router';
import { Inventory } from './components/inventory/inventory';
import { AddInventory } from './components/inventory/add-inventory/add-inventory';

export const routes: Routes = [
    {path: 'inventory', component: Inventory, title: 'Inventory'},
    {path: '', redirectTo: 'inventory', pathMatch: 'full'},
    {path: 'add-inventory', component: AddInventory},
];
