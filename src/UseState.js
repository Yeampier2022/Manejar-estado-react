import React from "react";

const SECURITY_CODE = 'paradigma'

function UseState({ name }) {
  const [state, setState] = React.useState({
    value: '',
    error: false,
    loading: false 
  })
  const [value, setValue] = React.useState('');
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  console.log(state)

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
    setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE){  
        setState({
          ...state,
          error: false,
          loading: false,
        })
        
        } else {
          setState({
          ...state,
            error: true,
            loading: false,
          })
           
        }
  
        console.log("terminando la validacion");
      }, 3000);
    }

    console.log("TErminando el efecto")
    }, [state.loading])

  return (
    <div>
      <h2>Eliminar {name}</h2>

      <p>Por favor, escribe el codigo de seguridad.</p>

      {(state.error && !state.loading) &&( <p>Error: El codigo es incorrecto</p>)}

      {state.loading && <p>Cargando...</p>}

      <input placeholder="codigo de seguridad"
      value={state.value}
      onChange={(event) =>{
        setState({
          ...state,
          value: event.target.value,
        })
       
      }} />
      <button onClick={() => { 
        setState({
          ...state,
          loading: true,
        })
     
    }}
        >Comprobar</button>
    </div>
  );
}

export { UseState };
