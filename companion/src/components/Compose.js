import React from "react"
import { compose, withState } from "recompose"

// Importamos withForm del otro ejemplo
import { withForm } from "./AddLogic"

// Componemos varios high-order components
const enhacer = compose(withForm, withState("pristine", "setPristine", true))

const composing = enhacer((
  // Recibimos todas las props juntas
  { pristine, setPristine, formData, setFormProp }
) => (
  <div
    style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column"
    }}
  >
    <input
      type="text"
      // En cada stroke, actualizamos la prop texto de nuestro form y seteamos pristine a false
      onChange={e => {
        setFormProp("texto", e.target.value)
        setPristine(false)
      }}
    />
    {/* Imprimimos nuestro form data y el estado de pristine */}
    <div>{JSON.stringify(formData)}</div>
    <div>{pristine ? "Nunca se escribió" : "Ya usado"}</div>
  </div>
))

export default composing
