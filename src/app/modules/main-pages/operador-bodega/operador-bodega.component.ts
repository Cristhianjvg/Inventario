import { Component, OnInit, TemplateRef } from '@angular/core';
import { Proveedor } from '../../../modelos/proveedor';
import { Producto } from '../../../modelos/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';
import { NombreProductoService } from '../../../services/nombre-producto.service';
import { functions } from '../../../helpers/functions';

@Component({
  selector: 'app-operador-bodega',
  templateUrl: './operador-bodega.component.html',
  styles: ``
})
export class OperadorBodegaComponent {

  cantidad: number;
  categoriaIntegridad: string;
  categoriaProducto: string;
  codigoSerial: string;
  nombre: string;
  proveedor: Proveedor;
  ideliminar?: string;

  closeResult = "";
  productoForm: FormGroup<any>;
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  nombresProducto: any;
  nombreProductoForm: FormGroup<any>;
  submited: boolean = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private modalService: NgbModal,
              private proveedorService: ProveedorService, private nombreProductoService: NombreProductoService) {
    this.cantidad = 0;
    this.categoriaIntegridad = "";
    this.categoriaProducto = "";
    this.codigoSerial = "";
    this.nombre = "";
    this.proveedor = {
      celular: "",
      correo: "",
      id: "",
      nombre: "",
    };
    this.nombreProductoForm = this.fb.group({
      nombre: ['', Validators.required],
      estado: ['', Validators.required]
    })
    this.productoForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      categoriaIntegridad: ['', Validators.required],
      categoriaProducto: ['', Validators.required],
      codigoSerial: ['', Validators.required],
      proveedor: ['', [Validators.email]],
    });
    
  }

  
  ngOnInit(): void {
    this.mostrarProductos();
    this.traerProveedores();
    this.traerNombreProducto();
  }

  mostrarProductos(){
    this.productoService.getAll().subscribe((data: any[]) => {
      this.productos = data;
    });
  }

  traerProveedores(){
    this.proveedorService.getAll().subscribe((data: any[]) => {
      this.proveedores = data;
    });
  }

  traerNombreProducto(){
    this.nombreProductoService.getAll().subscribe((data: any[]) => {
      this.nombresProducto = data;
    });
  }

  recepcion(){

  }

  ingCategorizarProducto(){
    this.submited = true
    const producto: Producto = {
      nombre: this.productoForm.value.nombre,
      cantidad: this.productoForm.value.cantidad,
      categoriaIntegridad: this.productoForm.value.categoriaProducto,
      categoriaProducto: this.productoForm.value.categoriaProducto,
      codigoSerial: this.productoForm.value.codigoSerial,
      proveedor: this.productoForm.value.proveedor,
    }
    this.productoForm.reset();
    this.modalService.dismissAll();
    
    // Conexion con el DAO
    this.productoService.add(producto).finally(() => {
      this.submited = false
    });
  }

  controlarExistencias(){
    const nombreProducto: any = {
      nombre: this.nombreProductoForm.value.nombre,
      estado: this.nombreProductoForm.value.estado
    }
    let nuevoProducto:any;
    // Controlar existencias
    this.nombreProductoService.add(nombreProducto).finally(() => {
      this.nombreProductoForm.reset();
    this.modalService.dismissAll();
    })
  }

  
  // Opcional: Puedes implementar verificarProveedor aquí si es necesario
  verificarEstado() {
    return true;
  }

  editar(): void {

    this.submited = true;
    const producto: Producto = {
      id: this.productoForm.value.id,
      nombre: this.productoForm.value.nombre,
      cantidad: this.productoForm.value.cantidad,
      categoriaIntegridad: this.productoForm.value.categoriaIntegridad,
      categoriaProducto: this.productoForm.value.categoriaProducto,
      codigoSerial: this.productoForm.value.codigoSerial,
      proveedor: this.productoForm.value.proveedor,
    }

    this.productoForm.reset();
    this.modalService.dismissAll();

    this.productoService.edit(this.productoForm.value.id,producto).finally(() => { this.submited = false});
  }

  eliminar(){
    this.productoService.delete(this.ideliminar)
  }

  invalidField(field:string){
    return functions.invalidField(field, this.productoForm,  true)
  }

}
