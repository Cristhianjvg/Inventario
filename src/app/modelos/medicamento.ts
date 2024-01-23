import { Proveedor } from "./proveedor";
import { Producto } from "./producto";

class Dispositivos extends Producto {
    fechaElaborado: Date;

    constructor(cantidad: number, categoriaIntegridad: string, categoriaProducto: string, codigoSerial: string, nombre: string, proveedor: Proveedor, fechaCaducidad: Date, fechaElaborado: Date) {
        super(cantidad, categoriaIntegridad, categoriaProducto, codigoSerial, nombre, proveedor, fechaCaducidad);
        this.fechaElaborado = fechaElaborado;
    }
}