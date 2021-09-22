
class Product {
    constructor() {
            this.#productInit();
            this.#productsRender(this.getProductList());
    }

    #productInit(){
        let productStorage = this.getProductList();
        if(!productStorage) this.setProductList(productList);
    }

    getProductList() {
        return JSON.parse(window.localStorage.getItem('productStorage'));
    }

    setProductList(productList){
        window.localStorage.setItem('productStorage', JSON.stringify(productList));
    }

    #productsRender(products){
        const productDiv = document.getElementById('product-div');
        productDiv.innerHTML='';
        products.map((prod)=> {
            productDiv.innerHTML += `
            <div class="col mb-4" id='product-id-${prod.id}'>
                <div class="card h-100 bg-light">
                    <img class="card-img-top img-thumbnail rounded mx-auto d-block mt-2"
                         src='${prod.imageUrl}' style="width: 150px; height: 150px" alt="...">
                    <div class="card-body text-center">
                        <h6 class="card-title mb-1">${prod.name}</h6>
                        <h5 class="card-text mb-1">${prod.price}</h5>
                        <p class="mb-1"><small>${prod.stock} unidad(es) disponible(s)</small></p>
                        <button type="button" class="btn btn-secondary btn-sm btn-block">Añadir a Compra</button>
                        <p id="product-cart-qty-${prod.id}" class="mb-1 ${ prod.cartQty === 0 ? 'd-none' : ''}"><small>Tienes ${prod.cartQty} unidad(es) en el carro</small></p>
                    </div>
                </div>
            </div>
            `
        });
    }

    async resetDefault(){
        window.localStorage.clear();
        this.#productInit();
        this.#productsRender(this.getProductList());
    }
}

const productList = [
    { id: 1, name: 'Mochila', price: 25000, stock: 4, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg'},
    { id: 2, name: 'Polera', price: 7500, stock: 3, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg'},
    { id: 3, name: 'Chaqueta', price: 55000, stock: 5, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_.jpg'},
    { id: 4, name: 'Anillo', price: 43000, stock: 2, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/61sbMiUnoGL._AC_UL640_QL65_ML3_.jpg'},
    { id: 5, name: 'Chaqueta Mujer', price: 57000, stock: 4, cartQty: 0, imageUrl: 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg'},
];




