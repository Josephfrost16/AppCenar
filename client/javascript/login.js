
const email = document.getElementById('email');
const password = document.getElementById('password');

const error = document.querySelector('.error');

function Login() {

    console.log(email.value);

    const data = {
        email: email.value,
        password: password.value,
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    fetch('http://localhost:4090/api/auth/login',config).then(response=>{
        if(!response.ok){
            throw new Error('Error al logear el usuario')
        }
        return response.json();
    })
    .then(data=>{
        // Aqui obtenemos el token en la variable data:
        console.log('token creado correctamente', data);
        error.classList.add('none');

    }).catch(err=>{
        console.log('Hubo un error en el fectch ',err)
        error.classList.remove('none');
    })
};
