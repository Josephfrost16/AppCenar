const email = document.getElementById('email');
const resetBtn = document.getElementById('Reset');


resetBtn.addEventListener('click', ()=>{
    reset();
})

function reset(){

    const data = {
        email: email.value,
    }

    const config = {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
    }

    if(data){
        fetch('http://localhost:4090/api/auth/reset',config).then(response=>{
            if(!response.ok){
                throw new Error('Error al intentar el reset en el server')
            }
            return response.json();
        })
        .then(data=>{
    
            if(data){

                window.location.href = '../../pages/Auth/login.html';
            }
           
        }).catch(err=>{
            console.log('Hubo un error en el fetch ',err);
        })
    }
}