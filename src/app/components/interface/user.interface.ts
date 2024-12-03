export interface User{
    _id: string,
    username: string,
    password:string,
    image: string,
    role:{
        type: string,
        enum: ['admin', 'user']
    },
    whislist:{

    },
    carrito:{

    },
    pedidos:{
        
    };
}