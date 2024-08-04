// iniciarSesionBtn = document.getElementById('iniciarSesion');

const email = document.getElementById('email');
const password = document.getElementById('password');

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

    fetch('http://localhost:4090/api/auth/login',config).then(response=>{
        if(!response.ok){
            throw new Error('Error al crear el usuario')
        }
        return response.json();
    })
    .then(data=>{
        // Aqui obtenemos el token en la variable data:

        console.log('token creado correctamente', data);

    }).catch(err=>{
        console.log('Hubo un error en el fectch ',err)
    })
};
