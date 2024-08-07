document.addEventListener("DOMContentLoaded", ()=>{
    fillBanner(1);
    fillSection(1);
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

function fillSection(commerceId){
    fetch(`http://localhost:4090/api/commerce_categorys/categories-commerce/${commerceId}`).then(response => {
        if (!response.ok) {
            throw new Error('fetch Error');
        }
        return response.json();
    }).then(data => {
        const productsContainer = document.querySelector('.productsContainer');

        data.forEach(category => {
            const section = document.createElement('div');
            section.className = 'section';
            section.innerHTML = `
                <div class="sectionTitle">
                    <label for="" id="textTitle">${category.name}</label>
                </div>
                <div class="contMenu" id="contMenu-${category.id}">
                </div>
            `;
            productsContainer.appendChild(section);

            const contMenu = section.querySelector(`#contMenu-${category.id}`);

            fetch(`http://localhost:4090/api/product/category-product/${category.id}`).then(response => {
                if (!response.ok) {
                    throw new Error('fetch Error');
                }
                return response.json();
            }).then(products => {
                products.forEach(product => {
                    const card = document.createElement('div');
                    card.className = 'card';
                    card.innerHTML = `
                        <img src="${product.image}" alt="">
                        <div class="cardData">
                            <label for="" class="cardTitle">${product.name}</label>
                            <label for="" class="cardDesc">${product.description}</label>
                            <div class="cardPrice">RD$ ${product.price}</div>
                            <button class="cardBtn" id="addBtn">add</button>
                        </div>
                    `;
                    contMenu.appendChild(card);
                    const addButton = card.querySelector('.cardBtn');
                    addButton.addEventListener('click', () => addToMiniCart(product));
                });
            }).catch(error => {
                console.log("get error", error);
            });
        });
    }).catch(error => {
        console.log("get error", error);
    });
}

function addToMiniCart(product) {
    const miniCartProducts = document.querySelector('.miniCart .products');
    const emptyMessage = document.querySelector('.miniCart .empty');

    if (emptyMessage) {
        emptyMessage.classList.add('none');
        miniCartProducts.classList.remove('none');
    }

    // Verificar si el producto ya está en el carrito comparando el nombre completo
    const existingProduct = Array.from(miniCartProducts.children).find(child => 
        child.getAttribute('data-fullname') === product.name
    );

    if (existingProduct) {
        alert('Este producto ya está en tu carrito.');
        return;
    }
    
    // Truncar el nombre del producto si tiene más de 10 caracteres
    let truncatedName = product.name;
    if (truncatedName.length > 10) {
        truncatedName = truncatedName.substring(0, 10) + '...';
    }

    const productCard = document.createElement('div');
    productCard.className = 'cardProducts';
    productCard.setAttribute('data-fullname', product.name); // Almacenar el nombre completo del producto
    productCard.innerHTML = `
        <label for="" class="nameProduct">${truncatedName}</label>
        <button class="delete" id="delete">Eliminar</button>
        <label for="" class="price">RD$ ${product.price}</label>
    `;
    
    miniCartProducts.appendChild(productCard);

    const deleteButton = productCard.querySelector('.delete');
    deleteButton.addEventListener('click', () => {
        miniCartProducts.removeChild(productCard);

        if (miniCartProducts.children.length === 0) {
            emptyMessage.classList.remove('none');
            miniCartProducts.classList.add('none');
        }
    });
}
