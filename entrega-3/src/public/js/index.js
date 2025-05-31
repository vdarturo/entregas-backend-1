

async function addProductToCart(){
    const PORT = document.getElementById("port").value;
    let cartId = document.getElementById("cart-id").value;
    console.log(cartId)
    if(!cartId){
        const result = await fetch(`http://localhost:${PORT}/api/carts`, {method: 'POST'});
        const cart = await result.json();
        document.getElementById("cart-id").value = cart.cid;
        cartId = cart.cid;
    }
    // metodo para agregar producto al carrito

    // Render a la pagina del carrito
    window.location.href = `http://localhost:${PORT}/carts/${cartId}`;
}

function cancelPurchase(){
    document.getElementById("cart-id").value = "";
}