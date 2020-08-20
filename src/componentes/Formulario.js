import React, {useState} from 'react';
import Error from './Error.js';

const Formulario = ({guardarBusqueda})=>{

    const [termino, guardarTermino] = useState('');
    const [error, guardarError] =useState(false);

    const buscarImagenes = e =>{
        e.preventDefault();

        //validar
        if(termino.trim() ===''){
            guardarError(true);
            return
        }
        guardarError(false);
        
        // enviar el termino búsquda hacia el componente principal
        guardarBusqueda(termino);
        

    }

    return(
        <form onSubmit ={buscarImagenes}>
            <div className="row">
                <div className="form-group col-md-8">
                    <input 
                        type="text"
                        className="form-control form-control-lg"
                        placeholder="Busca una imagen, ejemplo: futbol o café"
                        onChange = {e => guardarTermino(e.target.value)}
                    />
                </div>
                <div className="form-group col-md-4">
                    <input 
                        type="submit"
                        className="btn-lg btn-danger btn-block"
                        value="BUSCAR"
                    />
                </div>
            </div>

            {error ? <Error mensaje="Agrega un término de búsqueda"/>:null}
        </form>
    );
};

export default Formulario;