import { Producto } from "./producto";

export interface OperadorBodega {
    categorizarProducto(producto: Producto, categoria: string): Producto;
    controlarExistencias(): Producto;
    devolverProducto(): Producto;
    recepcionProducto(producto:Producto): void;
    verificarIntegridadProducto(): boolean;
}

class Operador implements OperadorBodega{
    categorizarProducto(producto: Producto, categoria: string): Producto {
        producto.categoriaProducto = categoria;
        throw new Error("Method not implemented.");
    }
    controlarExistencias(): Producto {
        throw new Error("Method not implemented.");
    }
    devolverProducto(): Producto {
        throw new Error("Method not implemented.");
    }
    recepcionProducto(producto: Producto): void {
        throw new Error("Method not implemented.");
    }
    verificarIntegridadProducto(): boolean {
        throw new Error("Method not implemented.");
    }

}

