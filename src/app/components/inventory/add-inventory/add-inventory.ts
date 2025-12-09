import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-add-inventory',
  imports: [ReactiveFormsModule],
  templateUrl: './add-inventory.html',
  styleUrl: './add-inventory.css',
})
export class AddInventory {
  route: Router = inject(Router);
  fb = inject(FormBuilder);
  activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  submitted = signal(false);
  isEditMode = signal(false);
  invId: string | null = null;
  inventoryForm!: FormGroup;

  constructor(){
    this.inventoryFormControls();

    this.invId = this.activatedRoute.snapshot.paramMap.get('id');
    if(this.invId){
      this.isEditMode.set(true);
    }
  }


  inventoryFormControls() {
    this.inventoryForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      category: ['', Validators.required],
      status: ['', Validators.required],
      price: ['', Validators.required],
      discount: ['', Validators.required],
      items: ['', Validators.required]
    })
  }

  onSubmit(){
    console.log(this.inventoryForm.value);
    this.submitted.set(true);

    if(this.inventoryForm.invalid) return;
    
  }

  isInvalid(controlName: string): boolean {
    const control = this.inventoryForm.get(controlName);
    return !!control && control.invalid && (control.touched || this.submitted());
  }

  goBack() {
    this.route.navigate(['/']);
  }

  

}
