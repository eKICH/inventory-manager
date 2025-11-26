import { Component, inject } from '@angular/core';
import { ListInventory } from "./list-inventory/list-inventory";
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventory',
  imports: [ListInventory],
  templateUrl: './inventory.html',
  styleUrl: './inventory.css',
})
export class Inventory {
  route: Router = inject(Router);

  addInventory(){
    this.route.navigate(['/add-inventory']);
  }

}
