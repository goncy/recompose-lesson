import React from "react"
import { withProps } from "recompose"

const flipName = withProps(({ name }) => ({
  flippedName: name
    .split("")
    .reverse()
    .join("")
}))

const addProps = flipName((
  // Recibimos nuestra prop flippedName junto con name
  { name, flippedName }
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
      Sabias que {name}, al revés es {flippedName}?
    </div>
  </div>
))

// Agregamos un default name a nuestro componente
addProps.defaultProps = {
  name: "Gonzalo"
}

export default addProps
