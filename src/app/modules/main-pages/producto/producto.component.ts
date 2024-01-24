import { Component, OnInit, TemplateRef } from '@angular/core';
import { Proveedor } from '../../../modelos/proveedor';
import { Producto } from '../../../modelos/producto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductoService } from '../../../services/producto.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';


@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styles: [
  ]
})

export class ProductoComponent implements Producto, OnInit{
  cantidad: number;
  categoriaIntegridad: string;
  categoriaProducto: string;
  codigoSerial: string;
  nombre: string;
  proveedor: Proveedor;

  closeResult = "";
  productoForm: FormGroup<any>;
  productos: Producto[] = [];

  constructor(private fb: FormBuilder, private productoService: ProductoService, private modalService: NgbModal) {
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
  }
  

  // Opcional: Puedes implementar verificarProveedor aquí si es necesario
  verificarEstado() {
    
    return true;
  }

  ingCategorizarProducto(){
    const producto: Producto = {
      nombre: this.productoForm.value.nombre,
      cantidad: this.productoForm.value.cantidad,
      categoriaIntegridad: this.productoForm.value.categoriaProducto,
      categoriaProducto: this.productoForm.value.categoriaProducto,
      codigoSerial: this.productoForm.value.codigoSerial,
      proveedor: this.productoForm.value.proveedor,
    }
    
    this.productoService.add(producto).finally(() => {
    });
  }

  mostrarProductos(){
    this.productoService.getAll().subscribe((data: any[]) => {
      this.productos = data;
    });
    
  }

  open(content: TemplateRef<any>, cliente?: any, crear?: boolean) {
    
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

    const producto: Producto = {
      id: this.productoForm.value.id,
      nombre: this.productoForm.value.nombre,
      cantidad: this.productoForm.value.cantidad,
      categoriaIntegridad: this.productoForm.value.categoriaIntegridad,
      categoriaProducto: this.productoForm.value.categoriaProducto,
      codigoSerial: this.productoForm.value.codigoSerial,
      proveedor: this.productoForm.value.proveedor,
    }

    this.productoService.edit(this.productoForm.value.id,producto).finally(() => {});
  }
}
