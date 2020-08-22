import React, {useState, useEffect} from 'react';
import Formulario from './componentes/Formulario.js';
import ListadoImagenes from './componentes/ListadoImagenes.js';

function App() {

  //state de la app
  const [busqueda, guardarBusqueda ]= useState('');
  const [imagenes, guardarImagenes] = useState([]);
  const [paginaActual, guardarPaginaActual] = useState(1);
  const [totalPaginas, guardarTotalPaginas] = useState(1);

  useEffect(() => {

    const consultarApi = async () =>{
      if(busqueda === '') return;

      const imagenesPorPagina =30;
      const key ='17979545-3a6e6f0cc86ab3f60609a07d2';
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&per_page=${imagenesPorPagina}&page=${paginaActual}`; 

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarImagenes(resultado.hits);

      // calcular el total de páginas a crear
      const calcularTotalPaginas = Math.ceil(resultado.totalHits / imagenesPorPagina);
      guardarTotalPaginas(calcularTotalPaginas);

      // Mover la pantalla hacia arriba
      const jumbotron = document.querySelector('.jumbotron');
      jumbotron.scrollIntoView({ behavior:'smooth'});
    };
    consultarApi();

  }, [busqueda, paginaActual])

  //definir página anterior
  const paginaAnterior = ()=>{
    const nuevaPaginaActual = paginaActual - 1;

    if(nuevaPaginaActual > 0){
      guardarPaginaActual(nuevaPaginaActual);
    };
  };

  //definir pagina siguiente
  const paginaSiguiente = ()=>{
    const nuevaPaginaSiguiente = paginaActual + 1;

    if(nuevaPaginaSiguiente <= totalPaginas){

      guardarPaginaActual(nuevaPaginaSiguiente);
    }
  }

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
            guardarBusqueda={guardarBusqueda}
        />
      </div>

      <div className="row justify-content-center">
        <ListadoImagenes 
          imagenes={imagenes}
        />
        {(paginaActual === 1) ? null : (
          <button
              type="button"
              className="bbtn btn-info mr-1"
              onClick={paginaAnterior}
          >&laquo; Anterior </button>
        )}

        {(paginaActual === totalPaginas) ? null : (
          <button
            type="button"
            className="bbtn btn-info"
            onClick = {paginaSiguiente}
          >Siguiente &raquo;</button>
        )}
      </div>   
    </div>
  );
}

export default App;
