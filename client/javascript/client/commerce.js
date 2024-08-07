document.addEventListener('DOMContentLoaded', ()=>{
    const name = localStorage.getItem('localName');
    getCommerceByFilter(name);
    console.log(name);
});

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
           content.appendChild(div);
        }

        console.log(data);
    }).catch(error =>{
        console.error('get error',error);
        getAll();
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
           content.appendChild(div);
        }
    }).catch(err=>{
        console.error('hay bobo manito', err)
    })

}