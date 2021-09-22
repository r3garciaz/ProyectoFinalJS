'use strict'
const Startup = () => {
    const resetDefaultBtn = document.getElementById('reset-default-btn');
    const userNameInput = document.getElementById('userName');
    const passwordInput = document.getElementById('password');
    const logginBtn = document.getElementById('loggin-btn');
    const realizarCompraBtn = document.getElementById('realizar-compra-btn');

    const user = new User();
    const product = new Product();
    const cart = new Cart();

    //Init Product
    product.productsRender();

    resetDefaultBtn.addEventListener('click', async () => {
        await product.resetDefault();
        await cart.resetDefault();
        window.location.reload();
    });

    logginBtn.addEventListener('click', () => {
        user.doLogin(userNameInput.value, passwordInput.value);
    });

    let buttons = document.querySelectorAll('button.productCartAdd')
    buttons.forEach((btn) => {
        btn.addEventListener("click", () => {
            // alert(event.target);
            cart.addProduct(parseInt(btn.dataset.productId));
        });
    });

    realizarCompraBtn.addEventListener('click', () =>{
        // console.log('boton compra');
        cart.buyProducts();
    });
}