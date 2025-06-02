

async function addProductToCart(pid){
    const PORT = document.getElementById("port").value;
    let cartId = document.getElementById("cart-id").value;

    if(!cartId){
        const result = await fetch(`http://localhost:${PORT}/api/carts`, {method: 'POST'});
        const cart = await result.json();
        document.getElementById("cart-id").value = cart.cid;
        cartId = cart.cid;
    }

    await fetch(`http://localhost:${PORT}/api/carts/${cartId}/product/${pid}`, {method: 'POST'});

    window.location.href = `http://localhost:${PORT}/carts/${cartId}`;
}

function cancelPurchase(){
    document.getElementById("cart-id").value = "";
}