import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { _Inventory } from '../../model/inventory.model';
import { Store } from '@ngrx/store';
import { InventoryState } from '../state/inventory.state';
import * as inventoryActions from '../state/inventory.actions';
import * as InventorySelectors from '../state/inventory.selectors';
import { filter, map, Observable, take } from 'rxjs';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-inventory',
  imports: [ReactiveFormsModule],
  templateUrl: './add-inventory.html',
  styleUrl: './add-inventory.css',
})
export class AddInventory implements OnInit {

  private route: Router = inject(Router);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  private fb = inject(FormBuilder);
  private store = inject(Store<InventoryState>);

  inventory$: Observable<_Inventory[]> = this.store.select(InventorySelectors.selectInventory);

  submitted = signal(false);

  invId = toSignal(
    this.activatedRoute.paramMap.pipe(
      map(params => params.get('id'))
    ),
    { initialValue: null }
  );

  isEditMode = computed(() => !!this.invId());

  inventoryForm!: FormGroup;


  ngOnInit(): void {
    this.inventoryFormControls();
    this.loadInventoryForEdit();

    if (this.isEditMode()) {
      this.store.dispatch(inventoryActions.loadInventory());
    }
    
  }

  private loadInventoryForEdit(): void {
    if (!this.isEditMode()) return;

    this.store
      .select(InventorySelectors.selectInventoryById(this.invId()!))
      .pipe(
        filter(Boolean),
        take(1)
      )
      .subscribe(item => {
        this.inventoryForm.patchValue(item!)
      })

  }

  inventoryFormControls() {
    this.inventoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],
      price: [0, Validators.required],
      discount: [0],
      quantity: [0, Validators.required]
    })
  }

  onSubmit(): void {
    this.submitted.set(true);

    if (this.inventoryForm.invalid) return;

    const formValue = this.inventoryForm.value;

    const item: _Inventory = {
      ...formValue,
      id: this.invId ?? undefined!
    };

    if (!this.isEditMode()) {

      this.store.dispatch(
        inventoryActions.createInventory({ item })
      )


    } else {
      this.store.dispatch(
        inventoryActions.updateInventory({ item })
      )

    }

    this.submitted.set(false);
    this.inventoryForm.reset();
    this.route.navigate(['/']);

  }

  isInvalid(controlName: string): boolean {
    const control = this.inventoryForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  goBack() {
    this.route.navigate(['/']);
  }



}
