const socket = io();

const btnAddProduct = document.getElementById("btnAddProduct");
btnAddProduct.addEventListener('click', async () => {
    try{
        let response = await fetch('http://localhost:8080/api/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "title": document.getElementById("title").value, 
                "description": document.getElementById("description").value, 
                "code": document.getElementById("code").value, 
                "price": document.getElementById("price").value, 
                "stock": document.getElementById("stock").value
            })
        });

        if (response.ok) {
            const data = await response.json();
        } else {
            console.error('Error:', response.status);
        }

        response = await fetch('http://localhost:8080/api/products', {
            method: 'GET'
        });

        if (response.ok) {
            const data = await response.json();
            socket.emit('show_products', data.products);
        } else {
            console.error('Error:', response.status);
        }
    } catch (error) {
        res.status(500).json({error: 'Error al obtener productos'})
    }
});

socket.on('show_products', (data)=>{
    let ul = document.getElementById("product_list");
    ul.innerHTML = '';

    data.forEach(product => {
        let li = document.createElement('li');
        li.innerHTML = product.title;

        const boton = document.createElement('button');
        boton.textContent = 'Eliminar';
        boton.setAttribute("id", product.id);
        boton.addEventListener('click', async () => {
            response = await fetch(`http://localhost:8080/api/products/${product.id}`, {
                method: 'DELETE'
            });
    
            if (response.ok) {
                const data = await response.json();
                socket.emit('show_products', data.products);
            } else {
                console.error('Error:', response.status);
            }
        });

        li.appendChild(boton);

        document.getElementById('product_list').appendChild(li);
    });
});