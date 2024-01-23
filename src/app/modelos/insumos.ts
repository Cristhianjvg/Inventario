import { Proveedor } from "./proveedor";
import { Producto } from "./producto";

class Dispositivos extends Producto {
    esteril: boolean; 
    type :string; 

    constructor(cantidad: number, categoriaIntegridad: string, categoriaProducto: string, codigoSerial: string, nombre: string, proveedor: Proveedor, fechaCaducidad: Date, esteril: boolean, type: string) {
        super(cantidad, categoriaIntegridad, categoriaProducto, codigoSerial, nombre, proveedor, fechaCaducidad);
        this.esteril = esteril;
        this.type = type;
    }
}