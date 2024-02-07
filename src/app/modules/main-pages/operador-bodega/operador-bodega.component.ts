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
import { InventarioService } from '../../../services/inventario.service';

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
  inventarioForm: FormGroup<any>;
  productos: Producto[] = [];
  proveedores: Proveedor[] = [];
  inventarios: any;
  ProductoForm: FormGroup<any>;
  submited: boolean = false;

  constructor(private fb: FormBuilder, private productoService: ProductoService, private modalService: NgbModal,
              private proveedorService: ProveedorService, private inventarioServices: InventarioService) {
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
    this.ProductoForm = this.fb.group({
      nombre: ['', Validators.required],
      categoriaIntegridad: ['', Validators.required],
      categoriaProducto: ['', Validators.required],
      codigoSerial: ['', Validators.required],
      proveedor: ['', Validators.required],
    })
    this.inventarioForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      cantidad: ['', Validators.required],
      
    });
    
  }

  
  ngOnInit(): void {
    this.mostrarProductos();
    this.traerProveedores();
    this.traerProductos();
  }

  // FUNCIONES PARA MOSTRAR LOS DATOS EN LA VISTA
  traerProductos(){
    this.productoService.getAll().subscribe((data: any[]) => {
      this.productos = data;
    });
  }

  mostrarProductos(){
    this.inventarioServices.getAll().subscribe((data: any[]) => {
      this.inventarios = data;
    });
  }

  traerProveedores(){
    this.proveedorService.getAll().subscribe((data: any[]) => {
      this.proveedores = data;
    });
  }
  // --------------------------------------------------

  // FUNCION PARA INGRESAR Y CATEGORIZAR LOS PRODUCTOS
  ingCategorizarProducto(){
    this.submited = true
    const producto: Producto = {
      nombre: this.ProductoForm.value.nombre,
      categoriaIntegridad: this.ProductoForm.value.categoriaIntegridad,
      categoriaProducto: this.ProductoForm.value.categoriaProducto,
      codigoSerial: this.ProductoForm.value.codigoSerial,
      proveedor: this.ProductoForm.value.proveedor,
    }
    this.ProductoForm.reset();
    this.modalService.dismissAll();
    
    this.productoService.add(producto).finally(() => {
      this.submited = false
    });
  }

  // FUNCION PARA CONTROLAR LAS EXISTENCIAS
  controlarExistencias(){
    const inventario: any = {
      nombre: this.inventarioForm.value.nombre,
      cantidad: this.inventarioForm.value.cantidad
    }
    this.inventarioServices.add(inventario).finally(() => {
      this.inventarioForm.reset();
      this.modalService.dismissAll();
    })
  }

  // EDITAR Y ELIMINAR PRODUCTO Y LOTES
  editarProducto(): void {

    this.submited = true;
    const producto: Producto = {
      id: this.ProductoForm.value.id,
      nombre: this.ProductoForm.value.nombre,
      categoriaIntegridad: this.ProductoForm.value.categoriaIntegridad,
      categoriaProducto: this.ProductoForm.value.categoriaProducto,
      codigoSerial: this.ProductoForm.value.codigoSerial,
      proveedor: this.ProductoForm.value.proveedor,
    }

    this.ProductoForm.reset();
    this.modalService.dismissAll();

    this.productoService.edit(this.ProductoForm.value.id,producto).finally(() => { this.submited = false});
  }

  eliminarProducto(){
    this.productoService.delete(this.ideliminar)
  }

  eliminarLote(){
    this.inventarioServices.delete(this.ideliminar)
  }
  // -----------------------------------------------
  

  // MISCELANEA
  open(content: TemplateRef<any>, producto?: any) {
    if(producto){
      this.ideliminar = producto.id;
    }
    
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
				this.closeResult = `Dismissed `;
			},
		);
	}

  mandarDatosEditar(id: any){
    let producto: any;
    this.productoService.getById(id).subscribe((data) => {
      producto = data;
      
      this.ProductoForm.patchValue({
        id: producto.id,
        nombre: producto.nombre,
        cantidad: producto.cantidad,
        categoriaIntegridad: producto.categoriaIntegridad,
        categoriaProducto: producto.categoriaProducto,
        codigoSerial: producto.codigoSerial,
        proveedor: producto.proveedor,
      });
    });
  }
  
  // Opcional: Puedes implementar verificarProveedor aquí si es necesario
  verificarEstado() {
    return true;
  }

  invalidField(field:string){
    return functions.invalidField(field, this.ProductoForm,  this.submited)
  }

}
