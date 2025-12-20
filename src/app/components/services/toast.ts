import { Injectable, signal } from '@angular/core';


export type ToastType = 'success' | 'error'

@Injectable({
  providedIn: 'root',
})

export class ToastService {

  toastMessage = signal<string | null>(null);
  toastType = signal<ToastType>('success');


  message = this.toastMessage.asReadonly();
  type = this.toastType.asReadonly();

  showSuccess(message: string): void {
    this.toastType.set('success');
    this.toastMessage.set(message);
  }

  showError(message: string): void {
    this.toastType.set('error');
    this.toastMessage.set(message);
  }

  clear(): void {
    this.toastMessage.set(null);
  }

}
