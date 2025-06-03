async function addProductToCart(pid){
    const PORT = document.getElementById("port").value;
    const quantity = parseInt(document.getElementById("quantity-input").value);
    let cartId = localStorage.getItem('cart-id');
    
    if(!cartId){
        const result = await fetch(`http://localhost:${PORT}/api/carts`, {method: 'POST'});
        const cart = await result.json();
        cartId = cart.cid;
        localStorage.setItem('cart-id', cartId);
    }

    data = { quantity: quantity };
    await fetch(
        `http://localhost:${PORT}/api/carts/${cartId}/product/${pid}`, 
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        }
    );

    //window.location.href = `http://localhost:${PORT}/carts/${cartId}`;
}

function buyPurchase(){
    const PORT = document.getElementById("port").value;

    localStorage.removeItem('cart-id');
    window.location.href = `http://localhost:${PORT}`;
}

function goToCart(){
    const PORT = document.getElementById("port").value;
    const cartId = localStorage.getItem('cart-id');

    if(cartId){
        window.location.href = `http://localhost:${PORT}/carts/${cartId}`;
    }else{
        alert("Su carrito de compras esta vacio");
    }
}

async function cancelPurchase(){
    const PORT = document.getElementById("port").value;
    const cartId = localStorage.getItem('cart-id');

    await fetch(`http://localhost:${PORT}/api/carts/${cartId}`, {method: 'DELETE'});
    localStorage.removeItem('cart-id');
    window.location.href = `http://localhost:${PORT}`;
}

async function removeProduct(pid){
    const PORT = document.getElementById("port").value;
    const cartId = localStorage.getItem('cart-id');

    await fetch(`http://localhost:${PORT}/api/carts/${cartId}/product/${pid}`, {method: 'DELETE'});

    const result = await fetch(`http://localhost:${PORT}/api/carts/${cartId}`);
    const cart = await result.json();
    if(cart.products.length === 0){
        cancelPurchase();
    }else{
        location.reload();
    }
}

function increaseQuantity(stock){
    const quantityInput = document.getElementById('quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if(currentValue < stock){
        quantityInput.value = currentValue + 1;
    }
}

function decreaseQuantity(){
    const quantityInput = document.getElementById('quantity-input');
    let currentValue = parseInt(quantityInput.value);
    if(currentValue > 1){
        quantityInput.value = currentValue - 1;
    }
}