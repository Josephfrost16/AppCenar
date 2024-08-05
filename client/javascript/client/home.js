document.addEventListener('DOMContentLoaded', ()=>{
    getCommerceCategory();
})


function getCommerceCategory(){
    fetch('http://localhost:4090/api/commerceType').then(response => {
        if(!response.ok){
            throw new Error('fetch error');
        }
        return response.json();
    }).then(data =>{
        const content = document.querySelector('.content');
        for (let i = 0; i < data.length; i++) {
            const card = document.createElement('div');
            card.className  = "cardType";
            card.style = `background-color: #${data[i].color};`
            card.innerHTML = `
                <label for="" class="typeTitle" style="color:${data[i].fontColor};">${data[i].type}</label>
                <img src="${data[i].icon}" alt="">
            `
            content.appendChild(card);
        }

    }).catch(err=>{
        console.error('get error', err)
    })
}