import React, {useState, useEffect} from 'react';
import Formulario from './componentes/Formulario.js';

function App() {

  //state de la app
  const [busqueda, guardarBusqueda ]= useState('');
  useEffect(() => {

    const consultarApi = async () =>{
      if(busqueda === '') return;

      const imagenesPorPagina = 30;
      const key ='17979545-3a6e6f0cc86ab3f60609a07d2';
      const url =`https://pixabay.com/api/?key=${key}&q=${busqueda}&par_page=${imagenesPorPagina}`; 

      const respuesta = await fetch(url);
      const resultado = await respuesta.json();

      guardarBusqueda(resultado.hits);
    };
    consultarApi();

  }, [busqueda])

  return (
    <div className="container">
      <div className="jumbotron">
        <p className="lead text-center">Buscador de Imágenes</p>
        <Formulario
            guardarBusqueda={guardarBusqueda}
        />
      </div>   
    </div>
  );
}

export default App;
