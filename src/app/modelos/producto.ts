import { Proveedor } from "./proveedor";

export interface Producto {
    cantidad: number;
    categoriaIntegridad: string;
    categoriaProducto: string;
    codigoSerial: string;
    nombre: string;
    proveedor: Proveedor;
}


