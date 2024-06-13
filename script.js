import sampleData from './utils/sampleData.js'

document.addEventListener('DOMContentLoaded', function () {

    const productGridContainer = document.querySelector('.product-grid-container');
    const productDialog = document.getElementById('productDialog');
    const btnClose = document.getElementById('btnClose');
    const btnCloseSecondary = document.getElementById('btnCloseSecondary');
    const dialogTitle = document.getElementById('dialogTitle');
    const dialogPrice = document.getElementById('dialogPrice');
    const dialogDescription = document.getElementById('dialogDescription');
    const dialogContents = document.getElementById('dialogContents');
    const productModalImgContainer = document.querySelector('.prod-modal-other-images')
    const productModalMainImg = document.getElementById('productModalMainImg')

    let mainSampleImg = 'assets/images/product-main-img.png'
    let sampleImg = [
        {
            id: 1,
            imgValue: 'assets/images/prodImg-1.png'
        },
        {
            id: 2,
            imgValue: 'assets/images/prodImg-2.png'
        },
        {
            id: 3,
            imgValue: 'assets/images/prodImg-3.png'
        },
        {
            id: 4,
            imgValue: 'assets/images/prodImg-4.png'
        },
    ]

    productModalMainImg.src = mainSampleImg

    // product card
    const productHTML = sampleData.map(prod => `
        <div class="prod-grid" key="${prod.id}">
          <div class="prod-grid-image">
            <img
              class=""
              src="assets/images/prod-grid-img.png"
              alt="image"
            />
          </div>
          <div class="btnQuickView">
            <h3 class="roboto-bold">${prod.title}</h3>
            <button data-quickView="${prod.id}" class="roboto-bold btnQckView">QUICK VIEW</button>
          </div>
        </div>
    `).join('');

    productGridContainer.innerHTML = productHTML;

    // card images
    const productImgHtml = sampleImg.map(imgItem => `    
        <div key="${imgItem.id}" class="prodImg-container">
            <img src="${imgItem.imgValue}" alt="image" />
        </div>
    `).join('');

    productModalImgContainer.innerHTML = productImgHtml

    // set img
    productModalImgContainer.addEventListener('click', (e) => {
        if (e.target && e.target.tagName === 'IMG') {
            e.preventDefault();
            const newSrc = e.target.getAttribute('src');
            productModalMainImg.src = newSrc;
        }
    })

    // btn quick view
    productGridContainer.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btnQckView')) {
            e.preventDefault();
            const prodId = e.target.getAttribute('data-quickview');
            const prod = sampleData.find(p => p.id == prodId);

            if (prod) {

                dialogTitle.textContent = prod.title;
                dialogPrice.textContent = `${prod.price} /-`;
                dialogDescription.textContent = prod.prod_desc;
                dialogContents.innerHTML = prod.prod_content.map(item => `
              <li>
                <img src="assets/icons/contentLogo.png" alt="img" />
                <p>${item.content}</p>
              </li>
            `).join('');

                productDialog.showModal();
            }
        }
    });

    // close dialog
    if (btnClose && productDialog && btnCloseSecondary) {

        btnClose.addEventListener('click', (e) => {
            e.preventDefault()
            productDialog.close()
        })

        btnCloseSecondary.addEventListener('click', (e) => {
            e.preventDefault()
            productDialog.close()
        })
    } else {
        console.error("Error")
    }

})