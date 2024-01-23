import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { ProductoComponent } from './main-pages/producto/producto.component';
import { ProveedorComponent } from './main-pages/proveedor/proveedor.component';

const routes: Routes = [
  {
    path: '',
    component: MainPagesComponent,
  },
  {
    path: 'producto',
    component: ProductoComponent
  },
  {
    path: 'proveedor',
    component: ProveedorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ModulesRoutingModule { }
