const menu = document.querySelector('.hamburguesa');
const navegacion = document.querySelector('.navegacion');
const imagenes = document.querySelectorAll('img');
const btnTodos = document.querySelector('.todos');
const btnPapelerias = document.querySelector('.papeleria');
const btnRedsocial = document.querySelector('.redsocial');
const btnMerchandising = document.querySelector('.merchandising');
const contenedorProductos = document.querySelector('.productos');
document.addEventListener('DOMContentLoaded',()=>{
    eventos();
    productos();
});

const eventos = () =>{
    menu.addEventListener('click',abrirMenu);
}

const abrirMenu = () =>{
     navegacion.classList.remove('ocultar');
     botonCerrar();
}

const botonCerrar = () =>{
    const btnCerrar = document.createElement('p');
    const overlay  = document.createElement('div');
    overlay.classList.add('pantalla-completa');
    const body = document.querySelector('body');
    if(document.querySelectorAll('.pantalla-completa').length > 0) return;
    body.appendChild(overlay);
    btnCerrar.textContent = 'x';
    btnCerrar.classList.add('btn-cerrar');

    // while(navegacion.children[5]){
    //     navegacion.removeChild(navegacion.children[5]);
    // }
    navegacion.appendChild(btnCerrar);
    cerrarMenu(btnCerrar,overlay);

}

const observer = new IntersectionObserver((entries, observer)=>{
        entries.forEach(entry=>{
            if(entry.isIntersecting){
                const imagen = entry.target;
                imagen.src = imagen.dataset.src;
                observer.unobserve(imagen);
            }
        });
});


imagenes.forEach(imagen=>{

    observer.observe(imagen);
});

const cerrarMenu = (boton, overlay) =>{
    boton.addEventListener('click',()=>{
        navegacion.classList.add('ocultar');
        overlay.remove();
        boton.remove();
    });

    overlay.onclick = function(){
        overlay.remove();
        navegacion.classList.add('ocultar');
        boton.remove();
    }
}

const productos = () =>{
    let productosArreglo = [];
    const productos = document.querySelectorAll('.producto');

    productos.forEach(producto=> productosArreglo = [...productosArreglo,producto]);

    const papelerias = productosArreglo.filter(papeleria=> papeleria.getAttribute('data-producto') === 'papeleria');
    const redessociales = productosArreglo.filter(redsocial => redsocial.getAttribute('data-producto') === 'redsocial');
    const merchandisings = productosArreglo.filter(merchandising => merchandising.getAttribute('data-producto') === 'merchandising');

    mostrarProductos(papelerias, redessociales, merchandisings, productosArreglo);

}

const mostrarProductos = (papelerias, redessociales, merchandisings, todos) =>{
    btnPapelerias.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        papelerias.forEach(papeleria=> contenedorProductos.appendChild(papeleria));
    });

    btnRedsocial.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        redessociales.forEach(redsocial=> contenedorProductos.appendChild(redsocial));
    });

    btnMerchandising.addEventListener('click', ()=>{
        limpiarHtml(contenedorProductos);
        merchandisings.forEach(merchandising=> contenedorProductos.appendChild(merchandising));
    });
    btnTodos.addEventListener('click',()=>{
        limpiarHtml(contenedorProductos);
        todos.forEach(todo=> contenedorProductos.appendChild(todo));
    });
}

const limpiarHtml = (contenedor) =>{
    while(contenedor.firstChild){
        contenedor.removeChild(contenedor.firstChild);
    }
}