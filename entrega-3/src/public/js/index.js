async function addProductToCart(pid){
    const PORT = document.getElementById("port").value;
    let cartId = localStorage.getItem('cart-id');
    
    if(!cartId){
        const result = await fetch(`http://localhost:${PORT}/api/carts`, {method: 'POST'});
        const cart = await result.json();
        cartId = cart.cid;
        localStorage.setItem('cart-id', cartId);
    }

    await fetch(`http://localhost:${PORT}/api/carts/${cartId}/product/${pid}`, {method: 'POST'});

    window.location.href = `http://localhost:${PORT}/carts/${cartId}`;
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