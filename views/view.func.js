document.addEventListener('DOMContentLoaded', function() {
    var formulariop = document.getElementById('formularioProducto');
    console.log(formulariop);
  

    var btnMostrarFormulario = document.getElementById('btnMostrarFormulario');
    if (btnMostrarFormulario) {
        btnMostrarFormulario.addEventListener('click', function() {
            mostrarFormulario();
        });
    }

    var btnCerrarFormulario = document.getElementById('cerrar-formulario');
    if (btnCerrarFormulario) {
        btnCerrarFormulario.addEventListener('click', function() {
            cerrarFormulario();
        });
    }

    function mostrarFormulario() {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.style.display = 'block';
    }

    function cerrarFormulario() {
        var formularioContainer = document.getElementById('formulario-container');
        formularioContainer.style.display = 'none';
    }
    function eliminarProduct(productId) {
        fetch(`http://localhost:3200/producto/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }
            return response.json();
        })
        .then(data => {
            alert('Producto eliminado exitosamente');
                })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }
    

    fetch('http://localhost:3200/producto')
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos');
            }
            return response.json();
        })
        .then(data => {
            const productos = data.productos;
            renderizarProductos(productos);
        })
        .catch(error => {
            console.error('Error al obtener la lista de productos:', error);
        });

    function renderizarProductos(productos) {
        const productContainer = document.getElementById('product-container');
        productContainer.innerHTML = '';

        productos.forEach(producto => {
            const productBox = document.createElement('div');
            productBox.classList.add('product-box');
            productBox.innerHTML = `
                <h3>${producto.nombre}</h3>
                <p>Categoría: ${producto.tipo}</p>
                <p>Stock: ${producto.cantidad} KG</p>
                <p>Registrado: ${formatDate(producto.fecha_registro)}</p>
                <button  onclick="editarProducto(${producto.id})">Editar</button>
                <button  onclick="eliminarProducto${(producto.id)}">Eliminar</button>`;
            productContainer.appendChild(productBox);
        });
    }

    function editarProducto(productId) {
        alert(`Editar producto con ID: ${productId}`);
    }


    function formatDate(dateString) {
        const date = new Date(dateString);
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();
        const formattedDay = day < 10 ? '0' + day : day;
        const formattedMonth = month < 10 ? '0' + month : month;
        return `${formattedDay}/${formattedMonth}/${year}`;
    }
});
