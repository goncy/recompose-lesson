import React from "react"
import { withState } from "recompose"

const welcomeable = withState(
  // El primer parametro va a ser el nombre que queremos darle a nuestro state
  "welcomed",
  // El segundo parametro va a ser el nombre que queremos darle a la función que va a setear nuestro state
  "setWelcomed",
  // El tercer parametro es el valor inicial de nuestro state
  true
)

const addState = welcomeable((
  // Recibimos 2 nuevas props
  { welcomed, setWelcomed }
) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <div>{welcomed ? "Hello Gonzalo" : "Fuck you Gonzalo"}</div>
    <button onClick={() => setWelcomed(!welcomed)}>Toggle</button>
  </div>
))

export default addState
