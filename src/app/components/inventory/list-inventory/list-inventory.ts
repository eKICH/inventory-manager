import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-inventory',
  imports: [],
  templateUrl: './list-inventory.html',
  styleUrl: './list-inventory.css',
})
export class ListInventory {

  route: Router = inject(Router);

  inventory = signal([
    {
      id: 1, 
      createDate: '10-09-2025', 
      name: 'Jiksu Motor',
      description: 'This is a motor',
      category: 'Engine',
      status: 'Available',
      price: 150.00,
      discount: '8%',
      items: 50
    },
    {
      id: 2, 
      createDate: '10-09-2025', 
      name: 'Honda Motor',
      description: 'This is a motor',
      category: 'Engine',
      status: 'Available',
      price: 250.00,
      discount: '5%',
      items: 100
    }
  ]);

  onInventoryEdit(id: number) {
    console.log("edit clicked!")
    this.route.navigate([`/${id}/edit-inventory`]);
  }

}
