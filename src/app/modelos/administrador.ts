import { Personal } from "./personal";
import { Producto } from "./producto";

export interface Administrador extends Personal{
    id:string; //Revisar este id?
    exportartInforme(informe: string): void;
    establecerParametros(): string;
    categorizarProveedor(id: string): void;
    generarInforme(): void;
    identificarProveedor(): void;
    ingresarProveedor(celular: string, correo: string, nombre:string): void;
}

// class administrador implements Administrador{
//     id: string;
//     celular: string;
//     correo: string;
//     nombre: string;
//     constructor(id: string, celular: string, correo: string, nombre: string){
//         this.id = id;
//         this.celular = celular;
//         this.correo = correo;
//         this.nombre = nombre;
//     }
//     exportartInforme(informe: string): void {
//         throw new Error("Method not implemented.");
//     }
//     establecerParametros(): string {
//         throw new Error("Method not implemented.");
//     }
//     categorizarProveedor(id: string): void {
//         throw new Error("Method not implemented.");
//     }
//     generarInforme(productos: Producto[]): string {
//         throw new Error("Method not implemented.");
//     }
//     identificarProveedor(): void {
//         throw new Error("Method not implemented.");
//     }
//     ingresarProveedor(celular: string, correo: string, nombre: string): void {
//         throw new Error("Method not implemented.");
//     }
    
    
// }


