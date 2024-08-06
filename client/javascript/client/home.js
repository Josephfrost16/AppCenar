import {scrollLeft, scrollRight} from '../AlternativeMethods.js';
const left1 = document.getElementById('left1');
const right1 = document.getElementById('right1');

const left2 = document.getElementById('left2');
const right2 = document.getElementById('right2');

const left3 = document.getElementById('left3');
const right3 = document.getElementById('right3');

document.addEventListener('DOMContentLoaded', ()=>{
    getCommerceCategory();
    addScrollEvents();
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


  