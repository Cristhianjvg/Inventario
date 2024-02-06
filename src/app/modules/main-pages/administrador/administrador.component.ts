import { Component, OnInit } from '@angular/core';
import { Producto } from '../../../modelos/producto';
import { Administrador } from '../../../modelos/administrador';
import { ProductoService } from '../../../services/producto.service';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: [
  ]
})
export class AdministradorComponent implements Administrador, OnInit{
  id: string;
  celular: string;
  correo: string;
  nombre: string;

  productos: any;

  constructor(private productoService: ProductoService){
    this.id = "";
    this.celular = "";
    this.correo = "";
    this.nombre = "";
  }
  ngOnInit(): void {
    this.generarInforme();
  }
  

  exportartInforme(informe: string): void {
    throw new Error('Method not implemented.');
  }
  establecerParametros(): string {
    throw new Error('Method not implemented.');
  }
  categorizarProveedor(id: string): void {
    throw new Error('Method not implemented.');
  }
  generarInforme(): void {
    this.productoService.getAll().subscribe((data: any[]) => {
      this.productos = data;
    });
    
  }
  identificarProveedor(): void {
    throw new Error('Method not implemented.');
  }
  ingresarProveedor(celular: string, correo: string, nombre: string): void {
    throw new Error('Method not implemented.');
  }
}
