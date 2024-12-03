import { inject, Injectable } from '@angular/core';
import { Product } from '../components/interface/producto.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  

  constructor() { }
  private http = inject(HttpClient);

  private apiUrl = "http://localhost:8080/api/products";

  private _products : Product[]=[];
  private _filteredProducts: Product[] = []; // Productos filtrados

  private productsSubject = new BehaviorSubject<Product[]>([]);
  public products$: Observable<Product[]> = this.productsSubject.asObservable(); 




  public get products(): Product[]{
    return this._products;
  }


  ifFormSubmitted:boolean=false;

  private _selectedProduct: Product | undefined;
  private _isEditing = false;

//   fetchProducts(): void {
//   this.http.get<Product[]>(this.apiUrl).subscribe({
//     next: (response) => {
//       this._products = response;
//       this.productsSubject.next(this._products); // Emitir todos los productos
//     },
//     error: (error) => {
//       console.log(error);
//     }
//   });
// }

 // Obtiene todos los productos
 fetchProducts() {
  this.http.get<Product[]>(this.apiUrl).subscribe({
    next: (response) => {
      this._products = response;
      this._filteredProducts = response; // Inicializamos los productos filtrados con todos los productos
      this.productsSubject.next(this._filteredProducts); // Emitimos los productos filtrados (inicialmente todos)
    },
    error: (error) => {
      console.error(error);
    },
  });
}


  deleteElement(id: string): void {
    this.http.delete(`${this.apiUrl}/${id}`).subscribe({
      next: () => {
        this._products = this._products.filter(product => product._id !== id);
        this._notifyChange();
      },
      error: (error) => {
        console.log('Error eliminando el producto:', error);
      }
    });
  }
  


get selectedProduct(): Product | undefined {
  return this._selectedProduct;
}

get isEditing(): boolean {
  return this._isEditing;
}

createElement(product: Product): void {
  this.http.post<Product>(this.apiUrl, product).subscribe({
    next: (response) => {
      this._products.push(response); 
      this._notifyChange();
    },
    error: (error) => {
      console.error("Error al agregar el producto", error);
    },
  });
}



updateElement(product: Product): void {
  this.http.put(`${this.apiUrl}/${product._id}`, product).subscribe({
    next: (updatedProduct) => {
      const index = this._products.findIndex(p => p._id === product._id);
      if (index !== -1) {
        this._products[index] = updatedProduct as Product;
        this._notifyChange();
      }
    },
    error: (error) => {
      console.error("Error al actualizar el producto", error);
    },
  });
}

updateProducts(products: any[]) {
  this.productsSubject.next(products);
}

// searchProducts(searchTerm: string): void {
//   const searchQuery = searchTerm.trim(); // Elimina espacios innecesarios
//   if (!searchQuery) {
//     this.fetchProducts(); // Si no hay término, carga todos los productos
//   } else {
//     this.http.get<Product[]>(`${this.apiUrl}?searchTerm=${searchQuery}`).subscribe({
//       next: (response) => {
//         this._products = response;
//         this.productsSubject.next(this._products); // Emitir los productos filtrados
//       },
//       error: (error) => {
//         console.error('Error buscando productos:', error);
//       },
//     });
//   }
// }
searchProducts(searchTerm: string): void {
  const searchQuery = searchTerm.trim();
  if (!searchQuery) {
    this._filteredProducts = this._products; // Si no hay término, mostramos todos los productos
  } else {
    this._filteredProducts = this._products.filter((product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }
  this.productsSubject.next(this._filteredProducts); // Emitimos los productos filtrados
}


 selectProductForEdit(product: Product): void {
    this._selectedProduct = product;
    this._isEditing = true;
  }

  private _notifyChange() {
    
  }

}


