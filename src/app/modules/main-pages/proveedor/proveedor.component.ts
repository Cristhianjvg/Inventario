import { Component, OnInit, TemplateRef } from '@angular/core';
import { Proveedor } from '../../../modelos/proveedor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProductoService } from '../../../services/producto.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProveedorService } from '../../../services/proveedor.service';

@Component({
  selector: 'app-proveedor',
  templateUrl: './proveedor.component.html',
  styles: [
  ]
})
export class ProveedorComponent implements Proveedor, OnInit{
  
  celular: string;
  correo: string;
  id: string;
  nombre: string;

  proveedor: any;
  proveedorForm: FormGroup<any>;
  idEliminar: string = "";
  closeResult: string = "";

  constructor(private fb: FormBuilder, private proveedorService: ProveedorService, private modalService: NgbModal){
    this.celular = "";
    this.correo = "";
    this.id = "";
    this.nombre = "";
    this.proveedorForm = this.fb.group({
      id: [''],
      nombre: ['', Validators.required],
      celular: ['', Validators.required],
      correo: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.mostrarProveedores();
  }


  mostrarProveedores(){
    this.proveedorService.getAll().subscribe((data: any[]) => {
      this.proveedor = data;
      console.log("hola",this.proveedor)
    });
  }

  ingresarProveedores(){
    const proveedor: Proveedor = {
      nombre: this.proveedorForm.value.nombre,
      celular: this.proveedorForm.value.celular,
      correo: this.proveedorForm.value.correo,
    }
    
    this.proveedorService.add(proveedor).finally(() => {
    });
  }
  
  mandarDatosEditar(id: any){
    let proveedor: any;
    this.proveedorService.getById(id).subscribe((data) => {
      proveedor = data;
      
      this.proveedorForm.patchValue({
        id: proveedor.id,
        nombre: proveedor.nombre,
        celular: proveedor.celular,
        correo: proveedor.correo
      });
    });
  }
  
  editar(): void {

    const producto: Proveedor = {
      id: this.proveedorForm.value.id,
      nombre: this.proveedorForm.value.nombre,
      celular: this.proveedorForm.value.celular,
      correo: this.proveedorForm.value.correo,
    }

    this.proveedorService.edit(this.proveedorForm.value.id,producto).finally(() => {});
  }

  eliminar(){
    this.proveedorService.delete(this.idEliminar)
  }

  open(content: TemplateRef<any>, producto?: any) {
    if(producto){
      this.idEliminar = producto.id;
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
}
