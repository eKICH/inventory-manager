import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZonelessChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { inventoryFeatureKey, inventoryReducer } from './components/inventory/state/inventory.reducer';
import { InventoryEffects } from './components/inventory/state/inventory.effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideRouter(routes),
    provideStore({
      [inventoryFeatureKey]: inventoryReducer
    }),
    provideEffects([InventoryEffects]),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })
]
};
