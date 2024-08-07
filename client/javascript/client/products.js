document.addEventListener("DOMContentLoaded", ()=>{
    fillBanner(1);
});

function fillBanner(commerceId){
    

    fetch(`http://localhost:4090/api/commerce/${commerceId}`).then(response=>{
        if(!response.ok){
            throw new Error('fetch Error');
        }
        return response.json();
    }).then(data=>{
        const banner = document.getElementById('banner');
        const title = document.querySelector('.title');
        const direction = document.querySelector('.direction');
        banner.style.backgroundImage = `url('${data.banner}')`;
        title.textContent = data.name;
        direction.textContent = data.direction;
    }).catch(error=> {
        console.log("get error",error);
    });
}