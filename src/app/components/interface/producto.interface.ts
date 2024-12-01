export interface Product{
    id: number,
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