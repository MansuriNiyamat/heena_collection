import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from '../../services/product.service';
import { product } from '../../Models/product.interface';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatError, MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { ErrorLogsService } from '../../services/error-logs.service';
@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule, MatIconModule, MatError , MatButtonModule, MatGridListModule, MatFormFieldModule, MatInputModule, ],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css'
})
export class ProductFormComponent {
 productForm: FormGroup;
  isEdit = false;
  productId: string | null = null;
  log = inject(ErrorLogsService)
  formBuilder: FormBuilder = inject(FormBuilder);
  productService:ProductService = inject(ProductService);
  router: Router = inject(Router);
  activeRoute: ActivatedRoute = inject(ActivatedRoute);
  saving = 0;
  total = 0;
  constructor() {
  
  }

  ngOnInit() {
 
    this.productForm = new FormGroup({
 
      name: new FormControl('',),
      description: new FormControl(''),
      mobile: new FormControl(''),
     
      items: new FormArray([]),
    });
    this.addItem();
    this.activeRoute.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.isEdit = true;
        this.productId = id;
        this.productService.getProduct(this.productId).subscribe((data: product) => {
          this.productForm.patchValue(data);
        });
      }
    });
  }
  get items() {
    return (this.productForm.get('items') as FormArray);
  }
  addItem() {
    const itemGroup = new FormGroup({
      name: new FormControl(''),
      qty: new FormControl(1, [Validators.required, Validators.min(1)]),
      size: new FormControl(''),
      price: new FormControl(0, [Validators.required, Validators.min(0)]),
      discount: new FormControl(10, [Validators.required, Validators.min(0)]),
      total: new FormControl(0, Validators.required),
    });
    this.items.push(itemGroup);
    this.updateProductTotals();
  }

  // Remove an item from the FormArray
  removeItem(index: number) {
    this.items.removeAt(index);
    this.updateProductTotals();
  }

  // Update the total for a given item
  updateTotal(index: number) {
    const itemGroup = this.items.at(index) as FormGroup;
    const qty = itemGroup.get('qty')?.value;
    const price = itemGroup.get('price')?.value;
    const discount = itemGroup.get('discount')?.value;
  
    // Calculate the total with discount percentage applied
    const total = (qty * price) * (1 - discount / 100);
    itemGroup.get('total')?.setValue(total);
    this.updateProductTotals();
  }
  updateProductTotals() {
    let grandTotal = 0;
    let totalSaving = 0;

    // Loop through all items and update the grandTotal and saving
    this.items.controls.forEach((itemGroup: any) => {
      const qty = itemGroup.get('qty')?.value;
      const price = itemGroup.get('price')?.value;
      const discount = itemGroup.get('discount')?.value;
      const total = itemGroup.get('total')?.value;

      // Calculate the original price (before discount)
      const originalTotal = qty * price;

      // Calculate the saving for this item (original total - discounted total)
      const saving = originalTotal - total;

      // Update grandTotal and saving
      grandTotal += total;
      totalSaving += saving;
    });
this.saving = totalSaving;
this.total = grandTotal;
    // Update the form fields for grandTotal and saving
   // this.productForm.get('grandTotal')?.setValue(grandTotal);
   // this.productForm.get('saving')?.setValue(totalSaving);
  }
  reset(){
    this.productForm.reset()
  }
  onSubmit() {
    if (this.productForm.invalid) return;
      const prod = this.productForm.value;
      const data:product = {
       
        name: prod.name,
        description: prod.description,
        saving: this.saving,
        grandTotal: this.total,
        items: prod.items,
        mobile:prod.mobile
      }

    if (this.isEdit && this.productId) {
      data.id = this.productId;
      this.productService
        .updateProduct(this.productId, data)
        .subscribe(() => {
        this.log.openSnackBar('Product Updated Sucessfully.')

          this.router.navigate(['/']);
        });
    } else {
      this.productService
        .createProduct(data)
        .subscribe(() => {
        this.log.openSnackBar('Product created Sucessfully.')
          this.router.navigate(['/']);
        });
    }
  }
  checkError(formControl: AbstractControl): string {
    if(formControl.touched){
    if (formControl.hasError('required')) {
      return 'This field is required'
    }
  
    if (formControl.hasError('min')) {
      return 'Value must be greater then 0';
    }
  }
    return ''
  }
}
