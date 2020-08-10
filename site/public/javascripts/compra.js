const compra = new Carrito();
const listaCompra = document.querySelector('#lista-compra tbody');
const carrito = document.getElementById('carrito');
const procesarCompraBtn = document.getElementById('procesar-compra');

cargarEventos();

function cargarEventos(){
    document.addEventListener('DOMContentLoaded', compra.leerLocalStorageCompra());

    carrito.addEventListener('click', (e) => {
        compra.eliminarProducto(e);
    });

    compra.calcularTotal();

    procesarCompraBtn.addEventListener('click', procesarCompra);
};

function procesarCompra(e){
    e.preventDefault();
    if(compra.obtenerProductosLocalStorage().length === 0){
        Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: 'No hay productos, seleccione alguno',
            icon: 'error',
            timer: 2500,
            showConfirmButton: false
          }).then( () => {
              window.location = '/';
          });
    } else if(compra.obtenerProductosLocalStorage().length !== 0){
        Swal.fire({
            title: 'Buen Trabajo!',
            text: 'Compra Finalizada',
            icon: 'success',
            timer: 3000,
            showConfirmButton: false
          }).then(() => {
              compra.vaciarLocalStorage();
              window.location = '/';
          });
    };
}