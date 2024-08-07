

document.addEventListener('DOMContentLoaded', function() {
    confirm();
});

const updateBtn = document.getElementById("Update");
const errorPop = document.querySelector('.error');

const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPass");

updateBtn.addEventListener("click", () => {
  validatePassword();
});


function confirm(){
    const token = localStorage.getItem('authToken');

        fetch( `http://localhost:4090/api/user/confirm/${token}`).then(response=>{
            if(!response.ok){
                throw new Error('Error al ingresar')
            }
            return response.json();
        })
        .then(data=>{
    
            if(data.success){
                console.log(data.message);
              
            }else{
                console.log(data.message);
            }
           
        }).catch(err=>{
            console.log('Hubo un error en el fectch ',err);
            errorPop.className = "error"
        })
    }

function validatePassword (){

    if (password.value !== confirmPassword.value){
        errorPop.className = "error";
        errorPop.textContent = "Las contraseñas no coinciden";
        return;
    }

    const data = {
        password: password.value,
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    if(data){
        fetch( `"http://localhost:4090/api/auth/reset/${token}"` ,config).then(response=>{
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
}