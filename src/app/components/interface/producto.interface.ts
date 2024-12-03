export interface Product{
    _id: string,
    title: string,
    price: number,
    description:string,
    image: string,
    category: string,
    marca:string,
    type:string,
    rating: {
        rate: number;
        count: number;
      };
}