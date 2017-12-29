import React from "react"
import { withStateHandlers } from "recompose"

export const withForm = withStateHandlers(
  // Armamos nuestro state inicial
  { formData: {} },
  {
    // Devolvemos nuestros handlers en un objeto donde cada key es un factory (una funcion que devuelve una funcion), la primer funcion recibe el state anterior, la segunda recibe los parametros que se le mandan en ejecucion
    setFormProp: ({ formData }) => (prop, value) => ({
      formData: { ...formData, [prop]: value }
    })
  }
)

const addLogic = withForm((
  // Al wrappear nuestro componente con withForm va a recibir 2 props nuevas, formData y setFormProp
  { formData, setFormProp }
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
      <div>Nombre: {formData.nombre}</div> {/* Usamos nuestro form data */}
      <div>Apellido: {formData.apellido}</div>
      <input
        type="text"
        placeholder="Nombre"
        onChange={
          /* Seteamos nuestro formData onChange */
          e => setFormProp("nombre", e.target.value)
        }
      />
      <input
        type="text"
        placeholder="Apellido"
        onChange={e => setFormProp("apellido", e.target.value)}
      />
      <div>{JSON.stringify(formData)}</div>
    </div>
  </div>
))

// Exportamos nuestro componente wrappead con withForm
export default addLogic
