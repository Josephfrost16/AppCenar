document.addEventListener('DOMContentLoaded', ()=>{
    FilterAll(localStorage.getItem('localName'));
    console.log(typeof(localStorage.getItem('localName')))
});

function FilterAll(data){
    const num = Number(data);
    if (isNaN(num)) {
        getCommerceByFilter(data);
    }else{
        FilterByType(num);
    }
}

function esCadenaDeTexto(variable) {
    return typeof variable === 'string';
}


function getCommerceByFilter(name){
    fetch(`http://localhost:4090/api/commerce/commerce-filter/${name}`).then(response =>{
        if(!response.ok){
            throw new Error('fetch error')
        }
        return response.json();
    }).then(data =>{
        const content = document.querySelector('.content');
        const cont = document.getElementById('cont');
        cont.textContent = `${data.length} Results`

        for (let i = 0; i < data.length; i++) {
           const div = document.createElement('div');
           div.className = 'cardCommerce';
           div.innerHTML = `
                <img src="${data[i].logo}" alt="">
                <div class="info">
                    <div class="headerInfo">
                        <label for="" class="name">${data[i].name}</label>
                        <span class="material-symbols-outlined icon" style=" font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">favorite</span>
                    </div>
                </div>
           `
           div.addEventListener('click', ()=>{
            localStorage.setItem('commerceSelected', data[i].id);
            window.location.href = '../../pages/client/products.html'
            
        })
           content.appendChild(div);
        }

        console.log(data);
    }).catch(error =>{
        console.error('get error',error);
        getAll();
    })
}

function FilterByType(commerceId){
    getCommerceByType(commerceId).then(data=>{
        const content = document.querySelector('.content');
        const cont = document.getElementById('cont');
        cont.textContent = `${data.length} Results`

        for (let i = 0; i < data.length; i++) {
           const div = document.createElement('div');
           div.className = 'cardCommerce';
           div.innerHTML = `
                <img src="${data[i].logo}" alt="">
                <div class="info">
                    <div class="headerInfo">
                        <label for="" class="name">${data[i].name}</label>
                        <span class="material-symbols-outlined icon" style=" font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">favorite</span>
                    </div>
                </div>
           `
           div.addEventListener('click', ()=>{
            localStorage.setItem('commerceSelected', data[i].id);
            window.location.href = '../../pages/client/products.html'
            
            })
           content.appendChild(div);
        }
            
    }).catch(err => {
        console.error(err);
    })
}



function getAll(){

    fetch('http://localhost:4090/api/commerce').then(response => {
        if(!response.ok){
            throw new Error('bueno manito hay bobo');            
        }
        return response.json()
    }).then(data =>{

        const content = document.querySelector('.content');

        for (let i = 0; i < data.length; i++) {
           const div = document.createElement('div');
           div.className = 'cardCommerce';
           div.innerHTML = `
                <img src="${data[i].logo}" alt="">
                <div class="info">
                    <div class="headerInfo">
                        <label for="" class="name">${data[i].name}</label>
                        <span class="material-symbols-outlined icon" style=" font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24">favorite</span>
                    </div>
                </div>
           `
           div.addEventListener('click', ()=>{
            localStorage.setItem('commerceSelected', data[i].id);
            window.location.href = '../../pages/client/products.html'
            
        });
           content.appendChild(div);
        }
    }).catch(err=>{
        console.error('hay bobo manito', err)
    })

}



async function getCommerceByType(commerceId){
    let commerces = await fetch(`http://localhost:4090/api/commerce/commerce-type/${commerceId}`);
    if (!commerces.ok) {
        throw new Error('fetch error')
    }
    const data = await commerces.json() 
    return data
}

