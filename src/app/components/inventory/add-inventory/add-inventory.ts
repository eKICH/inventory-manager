import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  imports: [],
  templateUrl: './add-inventory.html',
  styleUrl: './add-inventory.css',
})
export class AddInventory {
  route: Router = inject(Router);

  goBack() {
    this.route.navigate(['/'])
  }

}
