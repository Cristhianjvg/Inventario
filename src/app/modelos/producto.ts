import { Proveedor } from "./proveedor";

export interface Producto {
    id?: string;
    cantidad: number;
    categoriaIntegridad: string;
    categoriaProducto: string;
    codigoSerial: string;
    nombre: string;
    proveedor: Proveedor;
}


