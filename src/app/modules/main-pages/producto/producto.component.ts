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
    // Implementación de la verificación del proveedor
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
      console.log("hola")
    });
  }

  mostrarProductos(){
    this.productoService.getAll().subscribe((data: any[]) => {
      this.productos = data;
      console.log(this.productos)
    });
    
  }

  open(content: TemplateRef<any>, cliente?: any, crear?: boolean) {
    
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        console.log(this.productoForm)
			},
			(reason) => {
        // Funcion para cerrar el modal
				this.closeResult = `Dismissed `;
        console.log(this.productoForm)
			},
		);
	}
}
