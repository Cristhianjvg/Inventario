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
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
    `
    .btn-agregar{
        display: inline-block;
        border-radius: 4px;
        background-color: #3d405b;
        border: none;
        color: #FFFFFF;
        text-align: center;
        font-size: 17px;
        padding: 16px;
        width: 130px;
        transition: all 0.5s;
        cursor: pointer;
        margin: 5px;
    }

    .btn-agregar span {
        cursor: pointer;
        display: inline-block;
        position: relative;
        transition: 0.5s;
    }

    .btn-agregar span:after {
        content: '»';
        position: absolute;
        opacity: 0;
        top: 0;
        right: -15px;
        transition: 0.5s;
    }

    .btn-agregar:hover span {
        padding-right: 15px;
    }

    .btn-agregar:hover span:after {
        opacity: 1;
        right: 0;
    }
    `
  ]
})

export class ProductoComponent implements Producto, OnInit{

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

  // Opcional: Puedes implementar verificarProveedor aquí si es necesario
  verificarEstado() {
    return true;
  }

  controlarExistencias(){
    const nombreProducto: any = {
      nombre: this.nombreProductoForm.value.nombre,
      estado: this.nombreProductoForm.value.estado
    }
    let nuevoProducto:any;
    this.nombreProductoService.getByName(nombreProducto.nombre).subscribe((data: any) => {
      if (data) {
        console.log("el producto ya existe")
      }else{
        this.nombreProductoService.add(nombreProducto).finally(() => {
          this.nombreProductoForm.reset();
        this.modalService.dismissAll();
        })
      }
  });

  
  

  
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
    
    this.productoService.add(producto).finally(() => {
      this.submited = false
    });
  }

  

  open(content: TemplateRef<any>, producto?: any) {
    if(producto){
      this.ideliminar = producto.id;
    }
    
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
			},
			(reason) => {
        // Funcion para cerrar el modal
				this.closeResult = `Dismissed `;
			},
		);
	}

  mandarDatosEditar(id: any){

    let producto: any;
    this.productoService.getById(id).subscribe((data) => {
      producto = data;
      
      this.productoForm.patchValue({
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
