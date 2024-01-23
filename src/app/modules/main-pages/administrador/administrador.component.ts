import { Component } from '@angular/core';
import { Administrador } from 'src/app/modelos/administrador';
import { Producto } from 'src/app/modelos/producto';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.component.html',
  styles: [
  ]
})
export class AdministradorComponent implements Administrador{
  id: string;
  celular: string;
  correo: string;
  nombre: string;

  constructor(){
    this.id = "";
    this.celular = "";
    this.correo = "";
    this.nombre = "";
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
  generarInforme(productos: Producto[]): string {
    throw new Error('Method not implemented.');
  }
  identificarProveedor(): void {
    throw new Error('Method not implemented.');
  }
  ingresarProveedor(celular: string, correo: string, nombre: string): void {
    throw new Error('Method not implemented.');
  }
}
