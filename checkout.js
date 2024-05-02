let listCart = [];
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
addCartToHTML();

function addCartToHTML(){
    let listCartHTML = document.querySelector(".returnCart .list")
    listCartHTML.innerHTML = "";
    let totalQuantityHTML =  document.querySelector(".totalQuantity")
    let totalPriceHTML = document.querySelector(".totalPrice")

    let totalQuantity = 0;
    let totalPrice = 0;

    //if has produc in cart
    if(listCart){
        listCart.forEach(product =>{
            if(product){
                let newP = document.createElement("div");
                newP.classList.add("item")
                newP.innerHTML = 
                `<img src="${product.imageSrc}">
                <div class="info">
                    <div class="name"><p>${product.name}</p></div>
                    <div class="price">${product.price.toFixed(2)}</div>
                </div>
                <div class="quantity">${product.quantity}</div>
                <div class="returnPrice"><p>
                R${(product.price * product.quantity).toFixed(2)}
                </p>
                </div>`
                listCartHTML.appendChild(newP)
                totalQuantity = totalQuantity + product.quantity
                totalPrice = totalPrice + (product.price * product.quantity)
            }
        })
    }
    totalQuantityHTML.innerHTML = totalQuantity
    totalPriceHTML.innerHTML = "R" + totalPrice.toFixed(2)
}