import { Proveedor } from "./proveedor";
import { Producto } from "./producto";

class Dispositivos extends Producto {
    caracteristicasTecnicas :string; 
    type :string; 

    constructor(cantidad: number, categoriaIntegridad: string, categoriaProducto: string, codigoSerial: string, nombre: string, proveedor: Proveedor, fechaCaducidad: Date, caracteristicasTecnicas: string, type: string) {
        super(cantidad, categoriaIntegridad, categoriaProducto, codigoSerial, nombre, proveedor, fechaCaducidad);
        this.caracteristicasTecnicas = caracteristicasTecnicas;
        this.type = type;
    }
}