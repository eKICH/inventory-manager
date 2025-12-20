import { Component, inject, effect } from '@angular/core';
import { ToastService } from '../../services/toast';

@Component({
  selector: 'app-toast',
  imports: [],
  templateUrl: './toast.html',
  styleUrl: './toast.css',
})
export class Toast  {

  private toastService = inject(ToastService);

  message  = this.toastService.message;
  type = this.toastService.type;

  constructor() {

    effect(() => {
      if (this.message()) {
        setTimeout(() => this.toastService.clear(), 5000);
      }
    });
    
  }

  close(): void {
    this.toastService.clear();
  }

}
