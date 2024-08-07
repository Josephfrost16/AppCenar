// iniciarSesionBtn = document.getElementById('iniciarSesion');

const email = document.getElementById('email');
const password = document.getElementById('password');
const errorPop = document.querySelector('.error');
const loginBtn = document.getElementById('login');


loginBtn.addEventListener('click', ()=>{
    Login();
})


function Login() {
    
    const data = {
        email: email.value,
        password: password.value,
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }
    if(data){
        fetch('http://localhost:4090/api/auth/login',config).then(response=>{
            if(!response.ok){
                throw new Error('Error al ingresar')
            }
            return response.json();
        })
        .then(data=>{
    
            if(data){
                localStorage.setItem('authToken',data.token);
                console.log('token saved in localstorage');
                window.location.href = '../../pages/client/home.html';
            }
           
        }).catch(err=>{
            console.log('Hubo un error en el fectch ',err);
            errorPop.className = "error"
        })
    }
};
