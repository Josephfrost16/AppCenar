document.addEventListener('DOMContentLoaded',()=>{
    getAllDirections(localStorage.getItem('userId'));
});

function getAllDirections(user){
    fetch(`http://localhost:4090/api/directions/user/${user}`).then(response => {
        if(!response.ok){
            throw new Error('fetch error');
        }
        return response.json();
    }).then(data =>{
        console.log(data);
        const content = document.querySelector('.direcList');
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('div');
            
            card.className  = "direcCard";
            card.innerHTML = `
               <div class="data">
                    <input type="text" value="${data[i].location}" id="name" class="name" disabled>
                    <input type="text" value="${data[i].description}" id="description" class="description" disabled>
                </div>
                <div class="btns">
                    <button class="btn primary" id="edit">Editar</button>
                    <button class="btn primary" id="delete">Eliminar</button>
                </div>
            `
            
            content.appendChild(card);
            const deletebtn = document.getElementById('delete');
            deletebtn.addEventListener('click', ()=>{
                deleteb(data[i].id);
            })
        }

    }).catch(err=>{
        console.error('get error', err)
    })
}

function deleteb(user){
    fetch(`http://localhost:4090/api/directions/${user}`,{method:'DELETE',headers:'application/json'}).then(response => {
        if(!response.ok){
            throw new Error('fetch error');
        }
        return response.json();
    }).then(data =>{
        console.log('deleted',data);
        window.location.reload();
    }).catch(err=>{
        console.error('get error', err)
    })
}