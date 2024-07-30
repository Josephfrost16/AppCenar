const contact = document.querySelector(".contact");
const phone = document.querySelector(".phone");
const password = document.querySelector('.password');
const type = document.querySelector('.type');
const commerce = document.querySelector('.commerce');

const nextType = document.getElementById('nextType');
const nextContact = document.getElementById('nextContact');
const nextPhone = document.getElementById('nextPhone');
const nextCommerce =document.getElementById('nextCommerce');

const step1 = document.getElementById('step1');
const step2 = document.getElementById('step2');
const step3 = document.getElementById('step3');
const step4 = document.getElementById('step4');

const line1 = document.getElementById('line1');
const line2 = document.getElementById('line2');
const line3 = document.getElementById('line3');

const accountType = document.getElementById('accountType')



nextType.addEventListener('click', function(){
    changeColorYellow(line1,step2)

    if (accountType.value == 'cliente' || accountType.value == "delivery") {
        divOff('type',type);
        divOn('contact',contact);
    }else{
        divOff('type',type);
        divOn('commerce',commerce);
    }

    step2.addEventListener('click',step2F)
});

nextCommerce.addEventListener('click', function(){
    changeColorYellow(line2,step3)
    divOff('commerce', commerce);
    divOn('phone',phone);

    step3.addEventListener('click',step3F);
})

nextContact.addEventListener('click', function(){
    changeColorYellow(line2,step3)
    divOff('contact', contact);
    divOn('phone',phone);

    step3.addEventListener('click',step3F);
});


nextPhone.addEventListener('click', function(){
    changeColorYellow(line3,step4)
    divOff('phone',phone);
    divOn('password',password);
})



step1.addEventListener('click', function(){
    RemoveColorYellow(line3,step4);
    RemoveColorYellow(line2,step3);
    RemoveColorYellow(line1,step2);
    divOff('phone',phone);
    divOff('password',password);
    divOff('contact',contact);
    divOff('commerce',commerce);
    divOn('type',type);

    step2.removeEventListener('click',step2F);
    step3.removeEventListener('click',step3F);
});





function changeColorYellow(line, step){
    line.className = "line lineActive"
    step.className = "step active"
}

function RemoveColorYellow(line, step){
    line.className = "line"
    step.className = "step"
}

function divOff(name,div){
    div.className = `${name} flex none`;
}

function divOn(name,div){
    div.className= `${name} flex`;
}


function step2F(){
    RemoveColorYellow(line3,step4);
    RemoveColorYellow(line2,step3);
    changeColorYellow(line1,step2)
    divOff('password',password);
    divOff('phone',phone);
    divOff('commerce',commerce);
    divOn('contact',contact);
    step3.removeEventListener('click',step3F);
}

function step3F(){
    changeColorYellow(line2,step3);
    RemoveColorYellow(line3,step4)
    divOff('password',password);
    divOn('phone',phone);
}

