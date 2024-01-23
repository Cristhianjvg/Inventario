import { Producto } from "./producto";

export interface Inventario {
    id: string;
    nombre: string;
    fechaUpdate: Date;
    categorizarProducto(producto: Producto): void;
    controlarExistencia():void;
    crearInforme(): void;
    verificarInformacion(): Producto;
}


class inventario implements Inventario{
    id: string;
    nombre: string;
    fechaUpdate: Date;

    constructor(id: string, nombre: string, fechaUpdate: Date){
        this.id = id;
        this.nombre = nombre;
        this.fechaUpdate = fechaUpdate;
    }
    categorizarProducto(producto: Producto): Producto {

        throw new Error("Method not implemented.");
    }
    controlarExistencia(): void {
        throw new Error("Method not implemented.");
    }
    crearInforme(): void {
        throw new Error("Method not implemented.");
    }
    verificarInformacion(): Producto {
        throw new Error("Method not implemented.");
    }
    
}