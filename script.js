// CART
let iconCart = document.querySelector(".iconCart");
let mobileBag = document.querySelector("#mobileBag")
let cart = document.querySelector(".cart");
let container = document.querySelector(".container");
let close = document.querySelector(".close");


    iconCart.addEventListener("click", () => {
        // avoids the double click at the beginning
        if (!cart.style.right) {
            cart.style.right = "-100%";
        }
        if (cart.style.right === "-100%") {
            cart.style.right = "0";
            container.style.transform = 'translateX(-50vw)';
        } else {
            cart.style.right = "-100%";
            container.style.transform = "translateX(0)";
        }
    });
    mobileBag.addEventListener("click", () => {
        // avoids the double click at the beginning
        if (!cart.style.right) {
            cart.style.right = "-100%";
        }
    
        if (cart.style.right === "-100%") {
            cart.style.right = "0";
            container.style.transform = "translateX(-50vw)";
        } else {
            cart.style.right = "-100%";
            container.style.transform = "translateX(0)";
        }
    });


close.addEventListener("click", () =>{
    cart.style.right = "-100%";
     container.style.transform = "translateX(0)";
})

document.addEventListener("DOMContentLoaded", function(e) {
    const nextBtn = document.querySelectorAll('.nextBtn');
    const backBtn = document.querySelectorAll('.backBtn');

    e.preventDefault()
    nextBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            const gallery = this.parentElement.querySelector('.gallery');
            gallery.scrollBy({
                left: 300,
                behavior: 'smooth'
            });
        });
    });

    backBtn.forEach(btn => {
        btn.addEventListener('click', function() {
            const gallery = this.parentElement.querySelector('.gallery');
            gallery.scrollBy({
                left: -310,
                behavior: 'smooth'
            });
        });
    });
});






// displays the data from json file(featured sneakers)
let products = null;

fetch('product.json')
.then(response => response.json())
.then(data => {
    products = data;
    addDataToHTML();
})

function addDataToHTML(){
    //removes data default in html
    let listProductHTML = document.querySelector(".listProduct");
    listProductHTML.innerHTML = "";

    //add new datas
    if(products != null){
        products.forEach(product => {
            let newProduct = document.createElement("div");
            newProduct.classList.add("featured-box");
            newProduct.innerHTML = 
            `<div class="sneaker-box">
                <img src="${product.imageSrc}" alt="Sneaker" class="featured-sneaker">
                <div class="sneaker-text">
                    <h3>${product.name}</h3>
                    <h4>R${(product.price).toFixed(2)}</h4>
                    <button onclick="addCart(${product.id})">Add To Cart</button>
                </div>
            </div>`
        listProductHTML.appendChild(newProduct)
        })
    }
}


let listCart = []
//and get cookie data cart
function checkCart(){
    let cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith('featuredSneakers='));
    if(cookieValue){
        listCart = JSON.parse(cookieValue.split('=')[1]);
    }else{
        listCart = [];
    }
}
checkCart();

function addCart(idProduct){
    let productCopy = JSON.parse(JSON.stringify(products));
    ///if this product is not in the cart
    if(!listCart[idProduct]){
        let dataProduct = productCopy.filter(product => product.id == idProduct)[0];
        listCart[idProduct] = dataProduct
        listCart[idProduct].quantity = 1;
    } else{
        //if this product is already in the cart
        //increase quantity by 1
        listCart[idProduct].quantity++
    }
    //save data to cookie
    document.cookie = "featuredSneakers=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    addCartToHTML() 
}

addCartToHTML();
function addCartToHTML(){
    let listCartHTML = document.querySelector('.listCart');
    listCartHTML.innerHTML= "";
    let totalHTML = document.querySelector('.totalQuantity');
    let totalMobileHTML = document.querySelector('#mobile .totalQuantity');
    let totalQuantity = 0

    if(listCart){
        Object.values(listCart).forEach(product => {
            if(product){
                let newCart = document. createElement("div");
                newCart.classList.add("item");
                newCart.innerHTML = `
                <img src="${product.imageSrc}" alt="">
                <div class="content">
                    <div class="name"> ${product.name}</div>
                    <div class="price">R${product.price}</div>
                </div>
                <div class="quantity">
                    <button onclick="changeQuantity(${product.id}, '-')">-</button>
                    <span class="value">${product.quantity}</span>
                    <button onclick="changeQuantity(${product.id}, '+')">+</button>
                </div>`
                listCartHTML.appendChild(newCart)
                totalQuantity = totalQuantity + product.quantity;
            }
        })
    }
    totalHTML.innerText = totalQuantity;
    totalMobileHTML.innerText = totalQuantity;
}


function changeQuantity(idProduct, type){
    switch (type) {
        case '+':
            listCart[idProduct].quantity++;
            break;
        case '-':
            listCart[idProduct].quantity--;

            // if quantity <= 0 then remove product in cart
            if(listCart[idProduct].quantity <= 0){
                delete listCart[idProduct];
            }
            break;
    
        default:
            break;
    }
    // save new data in cookie
    document.cookie = "featuredSneakers=" + JSON.stringify(listCart) + "; expires=Thu, 31 Dec 2025 23:59:59 UTC; path=/;";
    // reload html view cart
    addCartToHTML();
}

/**
 * index
 * function that toggles the burger icon
 */
const bar = document.getElementById("bar");
const closeNav = document.getElementById("close");
const navbar = document.getElementById("navbar");

if (bar) {
    bar.addEventListener("click", () => {
        // Toggle the "active" class on the ".nav-list" element within the navbar
        navbar.querySelector('.nav-list').classList.toggle("active");
        if (navbar.querySelector('.nav-list').classList.contains("active")) {
            navbar.querySelector('.nav-list').style.zIndex = "999";}
        console.log("clicked")
    });
}

if (closeNav) {
    closeNav.addEventListener("click", () => {
        // Remove the "active" class from the ".nav-list" element within the navbar
        navbar.querySelector('.nav-list').classList.remove("active");
        navbar.querySelector('.nav-list').style.zIndex = "";
    });
}