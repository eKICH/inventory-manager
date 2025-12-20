import { Component, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Toast } from './components/shared/toast/toast';

@Component({
  selector: 'app-root',
  imports: [Header, Toast, RouterModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('inventory manager');
}
