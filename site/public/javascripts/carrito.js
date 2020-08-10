class Carrito {

    comprarProducto(e){
        e.preventDefault();
        if(e.target.classList.contains('agregar-carrito')){
            const producto = e.target.parentElement.parentElement;
            this.leerDatosProducto(producto);
        }
    };

    leerDatosProducto(producto) {
        const infoProducto = {
            imagen: producto.querySelector('img').src,
            titulo: producto.querySelector('h2').textContent,
            precio: producto.querySelector('.precio span').textContent,
            id: producto.querySelector('#getId').getAttribute('data-id'),
            cantidad: 1
        };
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach( (productoLS) => {
            if(productoLS.id === infoProducto.id){
                productosLS = productoLS.id;
            };
        });
        if(productosLS === infoProducto.id){
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'El producto ya está en el carrito',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
              })
        } else {
            this.insertarCarrito(infoProducto);
        };
    };

    insertarCarrito(producto){
        const fila = document.createElement('tr');
        fila.innerHTML = `
        <td>
            <img src="${producto.imagen}" width=100>
        </td>
        <td>${producto.titulo}</td>
        <td>${producto.precio}</td>
        <td>
            <a id="getId" href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
        </td>
        `;
        listaProductos.appendChild(fila);
        this.guardarProductosLocalStorage(producto);
    };

    eliminarProducto(e){
        e.preventDefault();
        let producto, productoID;
        if(e.target.classList.contains('borrar-producto')){
            e.target.parentElement.parentElement.remove();
            producto = e.target.parentElement.parentElement;
            console.log(producto);
            productoID = producto.querySelector('#getId').getAttribute('data-id');
        };
        this.eliminarProductoLocalStorage(productoID);
    };

    vaciarCarrito(e){
        e.preventDefault();
        while(listaProductos.firstChild){
            listaProductos.removeChild(listaProductos.firstChild);
        };
        this.vaciarLocalStorage();
        return false;
    };

    guardarProductosLocalStorage(producto){
        let productos;
        productos = this.obtenerProductosLocalStorage();
        productos.push(producto);
        localStorage.setItem('productos', JSON.stringify(productos));
    };

    obtenerProductosLocalStorage(){
        let productosLS;
        if(localStorage.getItem('productos') === null){
            productosLS = [];
        } else {
            productosLS = JSON.parse(localStorage.getItem('productos'));
        };
        return productosLS;

    };

    eliminarProductoLocalStorage(productoID){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach( (productoLS, index) => {
            if(productoLS.id === productoID){
                productosLS.splice(index, 1);
            };
        });
        localStorage.setItem('productos', JSON.stringify(productosLS));
    };

    leerLocalStorage(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach( (producto) => {
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <a id="getId" href="#" class="borrar-producto fas fa-times-circle" data-id="${producto.id}"></a>
            </td>
            `;
            listaProductos.appendChild(fila);
        });
    };

    leerLocalStorageCompra(){
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        productosLS.forEach( (producto) => {
            let precioFormated = Number(producto.precio.replace('$',''));
            const fila = document.createElement('tr');
            fila.innerHTML = `
            <td>
                <img src="${producto.imagen}" width=100>
            </td>
            <td>${producto.titulo}</td>
            <td>${producto.precio}</td>
            <td>
                <input type="number" class="form-control cantidad" min="1" value=${producto.cantidad}>
            </td>
            <td>$ ${precioFormated * producto.cantidad}</td>
            <td>
                <a id="getId" href="#" class="borrar-producto fas fa-times-circle" style="font-size: 30px" data-id="${producto.id}"></a>
            </td>
            `;
            listaCompra.appendChild(fila);
        });
    };

    vaciarLocalStorage(){
        localStorage.clear();
    };

    procesarPedido(e){
        e.preventDefault();
        let productosLS;
        productosLS = this.obtenerProductosLocalStorage();
        if(productosLS.length !== 0){
            location.href = 'cart';
        } else {
            Swal.fire({
                type: 'info',
                title: 'Oops...',
                text: 'Su carrito está vacio!',
                icon: 'error',
                timer: 2500,
                showConfirmButton: false
              })
        }
    };
};