'use strict'
class Cart {

    #cartProducts = [];

    constructor() {
        // if(!this.#cartProducts.length)
        //     this.#getCartStorage() === null ? this.#cartProducts = [] : this.#cartProducts = this.#getCartStorage();
        this.#cartInit();
        this.#cartRender(this.#cartProducts);
    }

    #cartInit(){
        let cartStorage = this.#getCartStorage();
        if(cartStorage){
            this.#cartProducts = cartStorage;
        }
        else{
            this.#cartProducts = [];
        }
    }

    addProduct(productId){
        // console.log('addProduct: ', productId);
        if(typeof productId !== 'number'){
            Swal.fire('ProyectoFinalJS','Error al agregar producto al carro de compras','error')
        }

        let product = new Product();
        let producto = product.getProduct(productId)
        // console.log(producto);
        const {id, name, price, stock, cartQty} = producto;

        if(stock < 1){
            Swal.fire('ProyectoFinalJS', 'No existe stock para este producto', 'warning');
            return
        }

        if(!this.#cartProducts.length || !this.#cartProducts.find(p => p.productId === id)){
            // console.log('Ingreso If');
            let cartProduct = new CartProduct(id, 1, 1*price);
            // console.log(cartProduct);
            this.#cartProducts.push(cartProduct);
            this.#setCartStorage(this.#cartProducts);
            product.updateProduct(productId);
            // setTimeout(() => {
            //     this.#cartRender(this.#cartProducts);
            // }, 300);
            // return;
        }
        else {
            // console.log('else');
            let prod = this.#cartProducts.filter(p => p.productId === productId)[0];
            prod.productQty+=1;
            this.#setCartStorage(this.#cartProducts);
            product.updateProduct(productId);
        }

        setTimeout(() => {
            // this.#cartRender(this.#cartProducts);
            window.location.reload();
        }, 200);
    }

    #setCartStorage(cartProducts){
        window.localStorage.setItem('cartStorage', JSON.stringify(cartProducts));
    }

    #getCartStorage(){
        return JSON.parse(window.localStorage.getItem('cartStorage'));
    }

    #cartRender(products){
        let totalProductPrice = 0;
        let totalProductDelivery = 1500;
        const cartDiv = document.getElementById('shopping-cart-products-div');
        const cartTotalDiv = document.getElementById('shopping-cart-total-div');
        cartDiv.innerHTML='';
        products.map((cartProd)=> {

            let productInst = new Product();
            let producto = productInst.getProduct(cartProd.productId)
            // console.log(producto);
            let {name, price, imageUrl} = producto

            totalProductPrice+=price * cartProd.productQty;
            totalProductDelivery += (350 * cartProd.productQty);
            cartDiv.innerHTML += `
            <div class="card mb-3 bg-light" style="max-width: 540px;">
                <div class="row no-gutters">
                    <div class="col-md-4 d-flex align-items-center justify-content-center">
                        <img class="bg-white rounded mx-auto d-block p-2" src="${imageUrl}" style="width: 75px; height: 75px" alt="...">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body p-2">
                            <h6 class="card-title mb-0">${name}</h6>
                            <p class="card-text m-0 text-muted"><small>$ ${price}</small></p>
                            <p class="card-text m-0 text-muted"><small>${cartProd.productQty} unidad(es)</small></p>
                            <p class="card-text m-0 text-muted"><small>Total $ ${price * cartProd.productQty}</small></p>
                        </div>
                    </div>
                </div>
            </div>
            `
        });

        cartTotalDiv.innerHTML =
        `    
            <p class="card-text m-0 text-muted"><small>Total de Productos $ ${totalProductPrice}</small></p>
            <p class="card-text m-0 text-muted"><small>Envío $ ${totalProductPrice > 0 ? totalProductDelivery : 0}</small></p>
            <p class="card-text m-0 text-muted"><small>Total a Pagar $ ${totalProductPrice > 0 ? totalProductPrice + totalProductDelivery : 0}</small></p>
        `
    }

    buyProducts(){
        if(!this.#cartProducts.length) {
            Swal.fire({
                title: 'ProyectoFinalJS',
                text: 'no puede realizar compras con el carro vacio',
                icon: 'error',
            });
            return;
        }

        let user = new User();
        if(!user.token){return;}

        Swal.fire({
            title: 'ProyectoFinalJS',
            text: 'Su compra está siendo procesada....',
            icon: 'info',
            showConfirmButton:false,
            allowOutsideClick: false,
            timer: 3000,
            timerProgressBar: true,
        }).then(() => {
            Swal.fire({
                title: 'ProyectoFinalJS',
                text: 'Compra exitosa!',
                icon: 'success',
                showConfirmButton:false,
                allowOutsideClick: false,
            });
        }).finally(() => {
           setTimeout(async() => {
                await this.resetDefault();
               let productInst = new Product();
               productInst.resetQuantity();
                window.location.reload();
           },3000);
        });
    }

    async resetDefault(){
        window.localStorage.removeItem('cartStorage');
        this.#cartInit();
        // this.#productsRender(this.#getProductListFromStorage());
    }
}

class CartProduct {
    constructor(productId, productQty = 1) {
        this.productId = productId;
        this.productQty = productQty;
    }
}

