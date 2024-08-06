import {scrollLeft, scrollRight} from '../AlternativeMethods.js';
const left1 = document.getElementById('left1');
const right1 = document.getElementById('right1');

const left2 = document.getElementById('left2');
const right2 = document.getElementById('right2');

const left3 = document.getElementById('left3');
const right3 = document.getElementById('right3');

document.addEventListener('DOMContentLoaded', ()=>{
    getCommerceCategory();
    getAllCommerces();
    addScrollEvents();
    Fill('content3',1);
    Fill('content4',3);
    Fill('content5',4);
})

function addScrollEvents(){
    left1.addEventListener('click', ()=>{
        scrollLeft('content1');
    });

    right1.addEventListener('click', ()=>{
        scrollRight('content1');
    })

    left2.addEventListener('click', ()=>{
        scrollLeft('content2');
    });

    right2.addEventListener('click', ()=>{
        scrollRight('content2');
    })

    left3.addEventListener('click', ()=>{
        scrollLeft('content3');
    });

    right3.addEventListener('click', ()=>{
        scrollRight('content3');
    })
}

function getCommerceCategory(){
    fetch('http://localhost:4090/api/commerceType').then(response => {
        if(!response.ok){
            throw new Error('fetch error');
        }
        return response.json();
    }).then(data =>{
        const content = document.getElementById('content1');
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

function getAllCommerces(){
    fetch('http://localhost:4090/api/commerce').then(response => {
        if(!response.ok){
            throw new Error('fetch error');
        }
        return response.json();
    }).then(data =>{
        const content = document.getElementById('content2');
        for (let i = 0; i < 6; i++) {
            const card = document.createElement('div');
            card.className  = "cardCommerce";
            card.innerHTML = `
               <img class="banner" src="${data[i].banner}" alt="">
                <div class="infoCommerce">
                    <img src="${data[i].logo}" alt="">
                    <div class="data">
                        <div class="titleData">
                            <label for="" class="name">${data[i].name}</label>
                            <span class="material-symbols-outlined">kid_star</span>
                            <label for="" class="calification">4.2</label>
                        </div>
                        <label for="" class="delivery">15-30 min • Envio $ 90</label>
                    </div>    
                </div>
            `
            content.appendChild(card);
        }

    }).catch(err=>{
        console.error('get error', err)
    })
}

function Fill(contentName, commerceId){
    getCommerceByType(commerceId).then(data=>{
        const content = document.getElementById(contentName);
        for (let i = 0; i < 6; i++) {
            const card = document.createElement('div');
            card.className  = "cardCommerce";
            card.innerHTML = `
               <img class="banner" src="${data[i].banner}" alt="">
                <div class="infoCommerce">
                    <img src="${data[i].logo}" alt="">
                    <div class="data">
                        <div class="titleData">
                            <label for="" class="name">${data[i].name}</label>
                            <span class="material-symbols-outlined">kid_star</span>
                            <label for="" class="calification">4.2</label>
                        </div>
                        <label for="" class="delivery">15-30 min • Envio $ 90</label>
                    </div>    
                </div>
            `
            content.appendChild(card);
        }
            
    }).catch(err => {
        console.error(err);
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
