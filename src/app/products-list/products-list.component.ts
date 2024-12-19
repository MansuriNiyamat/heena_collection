import { Component, inject, ViewChild , ChangeDetectionStrategy} from '@angular/core';
import { ProductService } from '../services/product.service';
import {Router} from '@angular/router'
import { product } from '../Models/product.interface';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatSort, MatSortModule} from '@angular/material/sort';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import { ErrorLogsService } from '../services/error-logs.service';
@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatPaginatorModule, MatIconModule, MatButtonModule],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ProductsListComponent {
  productService: ProductService  = inject(ProductService);
  router = inject(Router);
  log = inject(ErrorLogsService)
  displayedColumns: string[] = ['id', 'name', 'grandTotal', 'saving' , 'qty', 'action'];
  
  dataSource: MatTableDataSource<product> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  constructor(){
    this.productService
    .getProducts()
    .subscribe((data) => {
     
      this.dataSource.data = data
});
  }

  ngOnInit() {

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  addData() {
    this.router.navigate(['/create']);
  }

  editProduct(id: string) {
    this.router.navigate(['/edit', id]);
  }

  deleteProduct(id: string) {
    if (confirm('Are you sure you want to delete this product?')) {
      this.productService.deleteProduct(id).subscribe(() => {
        this.log.openSnackBar('Product deleted Sucessfully.')
        this.dataSource.data = this.dataSource.data.filter((res) => res.id !== id);
       
      });
    }
  }
}
