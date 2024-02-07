import { Producto } from "./producto";

export interface Inventario {
    id: string;
    nombre: string;
    fechaUpdate: Date;
    cantidad: number;
    categorizarProducto(producto: Producto): void;
    controlarExistencia():void;
    crearInforme(): void;
    verificarInformacion(): Producto;
}
