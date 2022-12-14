import React from "react";

const SECURITY_CODE = "paradigma";

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);


//   const onWrite = (newValue) => {
//     setState({
//       ...state,
//       value: newValue,
//     });
//   };

  React.useEffect(() => {
    console.log("empezando el efecto");

    if (!!state.loading) {
      setTimeout(() => {
        console.log("Haciendo la validacion");

        if (state.value === SECURITY_CODE) {
            dispatch({ type:'CONFIRM'})
        } else {
            dispatch({ type:'ERROR'})
        }

        console.log("terminando la validacion");
      }, 3000);
    }

    console.log("TErminando el efecto");
  }, [state.loading]);

  if (!state.deleted && !state.confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>

        <p>Por favor, escribe el codigo de seguridad.</p>

        {state.error && !state.loading && <p>Error: El codigo es incorrecto</p>}

        {state.loading && <p>Cargando...</p>}

        <input
          placeholder="codigo de seguridad"
          value={state.value}
          onChange={(event) => {
            dispatch({ type:'WRITE', payload: event.target.value})
           //onWrite(event.target.value);
          }}
        />
        <button
          onClick={() => {
            dispatch({ type:'CHECK'})
           // onCheck();
          }}
        >
          Comprobar
        </button>
      </div>
    );
  } else if (!!state.confirmed && !state.deleted) {
    return (
      <React.Fragment>
        <p>Pedimos confirmacion estas seguro?</p>
        <button
          onClick={() => {
            dispatch({ type:'DELETE'})
            //onDelete()
          }}
        >
          Si, lo eliminare
        </button>
        <button
          onClick={() => {
       //     onReset()
          }}
        >
          No, me arrepenti
        </button>
      </React.Fragment>
    );
  } else {
    return (
      <React.Fragment>
        <p>Eliminado con exito </p>
        <button
          onClick={() => {
            dispatch({ type:'RESET'})
         //onReset()
          }}
        >
          Resetear, volver atras
        </button>
      </React.Fragment>
    );
  }
}




const initialState = {
  value: "paradigma",
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

// const reducer = (state, action) => {

// }

const reducerIF = (state, action) => {
  if (action.type === "ERROR") {
    return {
      ...state,
      error: true,
      loading: false,
    };
  } else if (action.type === "CHECK") {
    return {
      ...state,
      loading: true,
    };
  } else {
    return {
      ...state,
    };
  }
};

const reducerSwitch = (state, action) => {
  switch (action.type) {
    case "ERROR":
      return {
        ...state,
        error: true,
        loading: false,
      };
    case "CHECK":
      return {
        ...state,
        error: true,
        loading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

const reducerObject = (state, payload) => ({
    'CONFIRM': {
        ...state,
        error: false,
         loading: false,
        confirmed: true,
        },
  'ERROR': {
    ...state,
    error: true,
    loading: false,
  },
  'WRITE': {
    ...state,
    value: payload
  },
  'CHECK': {
    ...state,
    loading: true,
  },
  'DELETE': {
    ...state,
    deleted: true,
  },
  'RESET': {
    ...state,
    confirmed: false,
    deleted: false,
    value: "",
  }
});

const reducer = (state, action) => {
  if (reducerObject(state)[action.type]) {
    return reducerObject(state, action.payload)[action.type];
  } else {
    return state;
  }
};

export { UseReducer  };
