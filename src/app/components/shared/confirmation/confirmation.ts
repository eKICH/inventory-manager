import { Component, input, output } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-confirmation',
  imports: [],
  templateUrl: './confirmation.html',
  styleUrl: './confirmation.css',
})
export class Confirmation {
  inventoryId = input<string | null>(null);
  inventoryName = input<string | null>(null);

  cancel = output<void>();
  confirm = output<void>();

  onNo(): void{
    this.cancel.emit();
  }

  onYes(): void {
    this.confirm.emit();
  }

}
