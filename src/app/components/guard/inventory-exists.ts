import { inject, Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router} from "@angular/router";
import { Store } from "@ngrx/store";
import { InventoryState } from "../inventory/state/inventory.state";

import * as InventorySelectors from '../inventory/state/inventory.selectors';
import * as InventoryActions from '../inventory/state/inventory.actions';
import { filter, map, of, switchMap, take, tap } from "rxjs";
import { ToastService } from "../services/toast";
import { slugify } from "../util/slug";

@Injectable({providedIn: 'root'})

export class InventoryExistsGuard implements CanActivate{

    private router = inject(Router);
    private store = inject(Store<InventoryState>);
    private toast = inject(ToastService);

    canActivate(route: ActivatedRouteSnapshot) {

        const id = route.paramMap.get('id');
        const name = route.paramMap.get('name');

        if (!id) {
            this.router.navigate(['/inventory']);
            return of(false);
        }

        return this.store
            .select(InventorySelectors.selectInventoryLoaded)
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                        this.store.dispatch(InventoryActions.loadInventory());
                    }
                }),

                filter(loaded => loaded),

                switchMap(() =>
                    this.store.select(InventorySelectors.selectInventoryById(id))
                ),

                take(1),

                map(item => {
                    if (!item) {
                        this.toast.showError('Inventory Not Found!');
                        this.router.navigate(['/inventory']);
                        return false;
                    }

                    const correctSlug = slugify(item.name);

                    if (name !== correctSlug) {
                        this.router.navigate(
                            ['/', item.id, correctSlug],
                            {replaceUrl: true}
                        );
                        return false;
                    }

                    return true;
                })
            );
    }
}