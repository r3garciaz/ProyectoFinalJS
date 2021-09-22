'use strict'
class Product {
    static #instance;
    #productListInit = [
        { id: 1, name: 'Mochila', price: 25000, stock: 4, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'},
        { id: 2, name: 'Polera', price: 7500, stock: 3, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'},
        { id: 3, name: 'Chaqueta', price: 55000, stock: 5, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'},
        { id: 4, name: 'Anillo', price: 43000, stock: 2, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'},
        { id: 5, name: 'Chaqueta Mujer', price: 57000, stock: 4, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'},
    ];

    #products = null;

    constructor() {
        this.#productInit();
        // this.#productsRender();

        if(!!Product.#instance){
            // console.log('instancia Product ya creada');
            return Product.#instance;
        }

        // console.log('creando instancia Product');
        Product.#instance = this;
    }

    #productInit(){
        let productStorage = this.#getProductListFromStorage();
        if(productStorage){
            this.#products = productStorage;
        }
        else{
            this.#products = this.#productListInit;
        }
    }

    #getProductListFromStorage() {
        return JSON.parse(window.localStorage.getItem('productStorage'));
    }

    #setProductListToStorage(productList){
        window.localStorage.setItem('productStorage', JSON.stringify(productList));
    }

    getProduct(productId){
        // console.log(this.#products);
        let {id, name, price, stock, cartQty, imageUrl} = this.#products.filter(f => f.id === productId)[0];
        return new ProductDesc(id, name, price, stock, cartQty, imageUrl);
    }

    updateProduct(productId){
        let product = this.#products.filter(p => p.id === productId)[0];
        product.cartQty = product.cartQty +1;
        product.stock = product.stock -1;
        this.#setProductListToStorage(this.#products);
        // this.productsRender();
    }

    productsRender(){
        // console.log('productRender', this.#products);
        const productDiv = document.getElementById('product-div');
        productDiv.innerHTML='';
        this.#products.map((prod)=> {
            productDiv.innerHTML += `
            <div class="col mb-4" id='product-id-${prod.id}'>
                <div class="card h-100 bg-light">
                    <img class="card-img-top img-thumbnail rounded mx-auto d-block mt-2"
                         src='${prod.imageUrl}' style="width: 150px; height: 150px" alt="...">
                    <div class="card-body text-center">
                        <h6 class="card-title mb-1">${prod.name}</h6>
                        <h5 class="card-text mb-1">${prod.price}</h5>
                        <p class="mb-1"><small>${prod.stock} unidad(es) disponible(s)</small></p>
                        <button type="button" class="btn btn-secondary btn-sm btn-block productCartAdd" data-product-id="${prod.id}">Añadir a Compra</button>
                        <p id="product-cart-qty-${prod.id}" class="mb-1 ${ prod.cartQty === 0 ? 'd-none' : ''}"><small>Tienes ${prod.cartQty} unidad(es) en el carro</small></p>
                    </div>
                </div>
            </div>
            `
        });
    }

    resetQuantity(){
        let products = this.#products;
        products.map(p => p.cartQty =0);
        this.#setProductListToStorage(this.#products);
    }

    async resetDefault(){
        window.localStorage.removeItem('productStorage');
        this.#productInit();
        this.productsRender();
    }
}

class ProductDesc{
    constructor(id, name, price, stock = 0, cartQty = 0, imageUrl = '') {
        this.id = id;
        this.name = name;
        this.price = price;
        this.stock = stock;
        this.cartQty = cartQty;
        this.imageUrl = imageUrl;
    }
}




