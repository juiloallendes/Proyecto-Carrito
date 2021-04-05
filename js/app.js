//variables
const carrito = document.querySelector('#carrito');
const contenedorCarrito = document.querySelector('#lista-carrito tbody');
const baciarCarritoBtn = document.querySelector('#vaciar-carrito');
const listaCursos = document.querySelector('#lista-cursos');
let articuloCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
    //CUANDO AGREGAS UN CURSO PRESIONANDO "AGREGAR CARRITO"
    listaCursos.addEventListener('click', agregarCurso)

    //ELIMINA CURSOS DEL CARRITO
    carrito.addEventListener('click', eliminarCurso);

    //VACIAR CARRITO
    baciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];

        limpiarHtml(); //ELIMINAMOS TODO EL HTML 
    })
}

//FUNCIONES
function agregarCurso(e) {
    e.preventDefault()
    if( e.target.classList.contains('agregar-carrito') ) {
        const cursoSelecionado = e.target.parentElement.parentElement
        leerDatosCurso(cursoSelecionado);
    }
    
}

//ELIMINAR CURSO DEL CARRITO
function eliminarCurso(e) {
    if (e.target.classList.contains('borrar-curso')) {
        const cursoId = e.target.getAttribute('data-id');

        //ELIMINAR DEL ARREGLO articuloCarrito POR EL data-id
        articuloCarrito = articuloCarrito.filter( curso => curso.id !== cursoId );

        carritoHtml();//ITERAR SOBRE EL CARRITO Y MOSTRAR SOBRE SU HTML

    }
}

//LEER EL CONTEDINDO DEL HTML AL QUE LE DIMOS CLICK
function leerDatosCurso(curso) {
    //console.log(curso);

    //CREAR UN OBJ CON EL CONTENIDO 
    const infoCurso = {
        imagen: curso.querySelector('img').src,
        titulo: curso.querySelector('h4').textContent,
        precio: curso.querySelector('.precio span').textContent,
        id: curso.querySelector('a').getAttribute('data-id'),
        cantidad: 1
    }

    //REVISA SI UN ELEMENTO YA EXISTE EN EL CARRITO
    const existe = articuloCarrito.some( curso => curso.id === infoCurso.id );
    if (existe) {

        //ACTUALIZAMOS LA CANTIDAD  
        const cursos = articuloCarrito.map( curso => {
            if (curso.id === infoCurso.id) {//CONSDICION PARA VERIFICAR CANTIDAD DE CURSO
                curso.cantidad++;//AGREGAMOS CURSOS A LA PROPIEDAD CANTIDAD CURSO+1
                return curso;//RETORNA EL OBJETO YA ACTUALIZADO
            } else {
                return curso;//RETORNA LOS OBJETOS QUE NO SON DUPLICADOS
            }
        } );
        articulosCarrito = [...cursos];

    } else {

        //AGREGAR ELEMENTOS AL ARREGLO DE CARRITO
        articuloCarrito = [...articuloCarrito, infoCurso];

    }



    console.log(articuloCarrito)

    carritoHtml();

}


//MUESTRA EL CONTENIDO DEL CARRITO
function carritoHtml() {

    //LIMPIAR EL HTML 
    limpiarHtml();

    //RECORRE EL CARRITO Y GENERA EL HTML



    articuloCarrito.forEach( curso => {
        const { imagen, titulo, precio, cantidad, id } = curso;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>
                <img src="${curso.imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href="#" class="borrar-curso" data-id="${id}"> X </a>
            </td>
        `
        //AGREGA EL HTML DEL CARRITO EN EL BODY
        contenedorCarrito.appendChild(row);
    })
}

//ELIMINA LOS CURSOS DEL TABLE BOBY
function limpiarHtml() {
    //FORMA LENTA
    //contenedorCarrito.innerHTML = '';

    while(contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild)
    }
}