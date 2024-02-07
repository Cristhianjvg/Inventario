import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ModulesRoutingModule } from './modules-routing.module';
import { MainPagesComponent } from './main-pages/main-pages.component';
import { ProveedorComponent } from './main-pages/proveedor/proveedor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { BrowserModule } from '@angular/platform-browser';
import { ProductoComponent } from './main-pages/producto/producto.component';
import { AdministradorComponent } from './main-pages/administrador/administrador.component';
import { OperadorBodegaComponent } from './main-pages/operador-bodega/operador-bodega.component';


@NgModule({
  declarations: [
    MainPagesComponent,
    ProveedorComponent,
    ProductoComponent,
    AdministradorComponent,
    OperadorBodegaComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    ModulesRoutingModule,
    provideFirestore(() => getFirestore())
  ]
})
export class ModulesModule { }
