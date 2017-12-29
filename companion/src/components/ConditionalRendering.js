import React from "react"
import { branch, withState, renderComponent } from "recompose"

// Creamos un placeholder para cuando el usuario no esta loggeado
const Placeholder = () => (
  <div>Tenes que estar logeado para ver el formulario</div>
)

// Creamos nuestro HOC
const justForLoggedUsers = branch(
  ({ logged }) => !logged, // El primer parametro es una function que recibe las props de nuestro componente y debe devolver true o false
  renderComponent(Placeholder) // En caso de que devuelva true (el usuario no esta logeado) va a renderizar este componente, notese que esta wrapeado en la funcion renderComponent
) // En caso de que de false va a renderizar nuestro componente original, como lo usamos mas abajo

const UserForm = justForLoggedUsers((
  { nombre, apellido } // Wrappeamos nuestro componente que queremos que solo vean los usuarios logeados con nuestro HOC
) => (
  <div>
    <div>Nombre: {nombre}</div>
    <div>Apellido: {apellido}</div>
  </div>
))

const ConditionalRendering = (
  { logged, setLogged } // Creamos un componente con 2 botones para probar nuestro componente original
) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <div>
      <button onClick={() => setLogged(true)}>Log in</button>
      <button onClick={() => setLogged(false)}>Log out</button>
    </div>
    <div
      style={{
        marginTop: 10,
        padding: 20,
        border: "1px solid black"
      }}
    >
      <UserForm nombre="Gonzalo" apellido="Pozzo" logged={logged} />
    </div>
  </div>
)

export default withState("logged", "setLogged", false)(ConditionalRendering) // Tip, withState es otro HOC que nos permite agregarle state a un componente funcional
