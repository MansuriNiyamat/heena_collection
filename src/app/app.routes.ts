import { Routes } from '@angular/router';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductFormComponent } from './products-list/product-form/product-form.component';
import { GitInegrationComponent } from './git-inegration/git-inegration.component';

export const routes: Routes = [
    { path: '', component: ProductsListComponent },
  { path: 'create', component: ProductFormComponent },
  { path: 'edit/:id', component: ProductFormComponent },
  {path: 'git', component: GitInegrationComponent}
];
