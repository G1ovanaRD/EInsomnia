import { Product } from "./producto.interface";

export interface User{
    _id: string,
    username: string,
    password:string,
    image: string,
    role: string,
    whislist:Product[],
    carrito: Product[],
    pedido: Product[]
}