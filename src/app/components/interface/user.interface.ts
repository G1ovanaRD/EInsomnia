import { Product } from "./producto.interface";

export interface User{
    _id: string,
    username: string,
    password:string,
    image: string,
    role: string,
    whislist:string[],
    carrito: string[],
    pedido: string[]
}