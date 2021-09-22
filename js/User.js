
class User {
    static #instance;
    #token = '';

    #userCredentials = {userName: 'pedro', password:'123', token: null};

    #logginBtn = document.getElementById('loggin-btn');
    #userWelcome = document.getElementById('user-welcome-h6')
    #realizarCompraBtn = document.getElementById('realizar-compra-btn');

    constructor() {
        console.log(this.#token);

        if(!!User.#instance){
            console.log('instancia ya creada');
            return User.#instance;
        }

        console.log('creando instancia');
        User.#instance = this;

        const userNameP = document.getElementById('user-name-p');
        const userPassswordP = document.getElementById('user-password-p');
        userNameP.innerHTML =`<small>usuario: ${this.#userCredentials.userName}</small>`;
        userPassswordP.innerHTML =`<small>contraseña: ${this.#userCredentials.password}</small>`;

        this.isLogin();
    }

    get token() {
        return window.sessionStorage.getItem('sessionId');
    }
    doLogin(userName, password){
        if(this.isLogin()){
            return
        }
        console.log({userName, password}, this.#token);
        if (userName === this.#userCredentials.userName && password === this.#userCredentials.password) {
            this.#token = this.#generateGUID();
            window.sessionStorage.setItem('sessionId', this.#token);

            this.#processLogin();

            Swal.fire({
                title: 'ProyectoFinalJS',
                text: `Bienvenido ${userName}`,
                showConfirmButton: true,
                confirmButtonText: 'Aceptar'
            });
        }
    }

    doLogout() {
        this.#token = '';
        this.#logginBtn.classList.remove('d-none');
        this.#userWelcome.innerHTML='Iniciar Sesión';
    }

    isLogin(){
        if(this.token !== null){
            this.#processLogin();
            return true;
        }
        return false;
    }

    #processLogin(){
        this.#userCredentials.token = this.#token;
        this.#logginBtn.classList.add('disabled');
        this.#userWelcome.innerHTML = `Bienvenido ${this.#userCredentials.userName}`;
        this.#realizarCompraBtn.classList.remove('disabled');
    }

    #generateGUID() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }
}