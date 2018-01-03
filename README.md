# Lección: Componiendo unos re componentes con Recompose

## Intro
> _Recompose is a React utility belt for function components and higher-order components. Think of it like lodash for React._

Listo, fín del curso. Ahre ☺️ xdxd.

Bueno, flogger out. Primero que nada, hola!
Me llamo **Gonzalo Pozzo** y en el momento de escribir esto era Frontend Developer en [The Next Ad](https://www.thenextad.com/) (De no ser así, hola desde el pasado!).
Hoy les vengo a hablar de una de las librerias que más uso y más me gusta, [Recompose](https://github.com/acdlite/recompose).
Como vimos un poco más arriba, recompose es una libreria de utilidades para componentes y **high-order components** de React.

### 🙋‍♂️️ Ni idea que es un high-order component.
No os preocupeis, es mucho más fácil de lo que parece.
Directo de [la documentación de React](https://reactjs.org/docs/higher-order-components.html):
> **A higher-order component is a function that takes a component and returns a new component.**
```jsx
const AltoComponente = unHighOrderComponent(UnComponenteMedioPelo);
```
Si usas [Redux](https://redux.js.org/docs/introduction/), su high-order component más conocido es *connect*. O si usas [Mobx](https://github.com/mobxjs/mobx) su high-order component más conocido es *observable*.
Si no te quedo claro, tranqui, esto recién empieza.

## Ejemplos
Basta de chacharas y vamos a ver algunos ejemplos de cosas que podemos hacer:

> Tip: [Acá](https://goncy.github.io/recompose-lesson) podes verlos a todos funcionando

### Agregar estado
#### [Código completo](./companion/src/components/AddState.js) - [Ejemplo editable](https://codesandbox.io/s/yp07yw1rmv)
Cuantas veces pasó que tuvimos que agregar solo una propiedad al state de nuestro componente y tuvimos que hacerlo *class* para eso? `withState` al rescate.
> ![01](./assets/add-state.gif)

```jsx
import React from "react"
import {render} from "react-dom"
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
  // Recibimos nuestras 2 nuevas props
  { welcomed, setWelcomed }
) => (
    <div
      // Estilos para el contenedor
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

// Por comodidad guardamos nuestro componente en la variable App
const App = addState

// Renderizamos nuestra app
render(<App />, document.getElementById('root'));
```

> TIP: Si te gusta el estilo reducer de Redux, podes usar [withReducer](https://github.com/acdlite/recompose/blob/master/docs/API.md#withreducer), si necesitas muchos estados podes simplemente nestear varios [withState](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstate) con [compose](https://github.com/acdlite/recompose/blob/master/docs/API.md#compose) o usar [withStateHandlers](https://github.com/acdlite/recompose/blob/master/docs/API.md#withstatehandlers)

### Rendering condicional
#### [Código completo](./companion/src/components/ConditionalRendering.js) - [Ejemplo editable](https://codesandbox.io/s/zn95pwkm4)
Muchas veces necesitamos renderizar o no un componente basado en una prop que le llega, aislar ese caso por ejemplo para login nos permitiria mostrar secciones solo para usuarios logeados sin repetir codigo, o mostrar un loader/spinner mientras una prop de loading este en true, ahi es donde `branch` de recompose entra en juego.
> ![01](./assets/conditional-rendering.gif)

```jsx
import React from "react"
import {render} from "react-dom"
import { branch, withState, renderComponent } from "recompose"

// Creamos un placeholder para cuando el usuario no esta loggeado
const Placeholder = () => (
  <div>Tenes que estar logeado para ver el formulario</div>
)

// Creamos nuestro HOC
const justForLoggedUsers = branch(
  // El primer parametro es una function que recibe las props de nuestro componente y debe devolver true o false
  ({ logged }) => !logged,
  // En caso de que devuelva true (el usuario no esta logeado) va a renderizar este componente, notese que esta wrapeado en la funcion renderComponent
  renderComponent(Placeholder)
  // En caso de que de false va a renderizar nuestro componente original, como lo usamos mas abajo
)

const UserForm = justForLoggedUsers((
  // Wrappeamos nuestro componente que queremos que solo vean los usuarios logeados con nuestro HOC
  { nombre, apellido }
) => (
    <div>
      <div>Nombre: {nombre}</div>
      <div>Apellido: {apellido}</div>
    </div>
  ))

const ConditionalRendering = (
  // Creamos un componente con 2 botones para probar nuestro componente original
  { logged, setLogged }
) => (
    <div
      // Estilos para el contenedor
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


// Por comodidad guardamos nuestro componente en la variable App// Tip, withState es otro HOC que nos permite agregarle state a un componente funcional
const App = withState("logged", "setLogged", false)(ConditionalRendering)

// Renderizamos nuestra app
render(<App />, document.getElementById('root'));
```

### Agregar lógica
#### [Código completo](./companion/src/components/AddLogic.js) - [Ejemplo editable](https://codesandbox.io/s/zl2336ro3x)
A veces necesitamos agregar la misma lógica a varios de nuestros componentes, como por ejemplo, un state para guardar data de un formulario, con recompose y `withStateHandlers` podes crear tu propio high-order component y reutilizarlo en todos tus componentes.
> ![01](./assets/add-logic.gif)

```jsx
import React from "react"
import {render} from "react-dom"
import { withStateHandlers } from "recompose"

const withForm = withStateHandlers(
  // Armamos nuestro state inicial
  { formData: {} },
  {
    // Devolvemos nuestros handlers en un objeto donde cada key es un factory (una funcion que devuelve una funcion), la primer funcion recibe el state anterior, la segunda recibe los parametros que se le mandan en ejecucion
    setFormProp: ({ formData }) => (prop, value) => ({
      formData: { ...formData, [prop]: value }
    })
  }
)

const addLogic = (
  // Al wrappear nuestro componente con withForm va a recibir 2 props nuevas, formData y setFormProp
  { formData, setFormProp }
) => (
    <div
      // Estilos para el contenedor
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column"
      }}
    >
      <div>
        {/* Usamos nuestro form data */}
        <div>Nombre: {formData.nombre}</div>
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
  )


// Por comodidad guardamos nuestro componente en la variable App// Exportamos nuestro componente wrappead con withForm
const App = withForm(addLogic)

// Renderizamos nuestra app
render(<App />, document.getElementById('root'));
```

### Agregando props a base de nuestras props
#### [Código completo](./companion/src/components/AddProps.js) - [Ejemplo editable](https://codesandbox.io/s/y03rz2q4wz)
Posiblemente el título no se entiendo, por estoy acá, para explicarlo peor todavía. Muchas veces necesitamos props nuevas basadas en nuestras props viejas, para eso tenemos [withProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#withprops) y [mapProps](https://github.com/acdlite/recompose/blob/master/docs/API.md#mapprops), ambas funcionan igual, solo que `withProps` agrega las props a nuestras props existentes y `mapProps` reemplaza todas nuestras props.
> ![01](./assets/add-props.gif)

```jsx
import React from "react"
import {render} from "react-dom"
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
      // Estilos para el contenedor
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

// Por comodidad guardamos nuestro componente en la variable App
const App = addProps

// Renderizamos nuestra app
render(<App />, document.getElementById('root'));
```

### Componer varios high-order components
#### [Código completo](./companion/src/components/Compose.js) - [Ejemplo editable](https://codesandbox.io/s/vqz5q9zy60)
A veces necesitamos wrappear nuestr componente con varios high-order components, por ejemplo, `connect` de redux junto con `withState`, escribirlo como `withState(..., connect(MiComponenteMedioPelo))` se vuelve ilegible, más si tenemos que seguir agregando otros como `gql` de Apollo o más, para esto tenemos [compose](https://github.com/acdlite/recompose/blob/master/docs/API.md#compose). Compose nos permite componer *duh*, varios high-order components, dejando nuestro codigo mas legible.
> ![01](./assets/compose.gif)

```jsx
import React from "react"
import {render} from "react-dom"
import { compose, withState } from "recompose"

// Importamos withForm del otro ejemplo
import withForm from "./withForm"

// Componemos varios high-order components
const enhacer = compose(withForm, withState("pristine", "setPristine", true))

const composing = enhacer((
  // Recibimos todas las props juntas
  { pristine, setPristine, formData, setFormProp }
) => (
    <div
      // Estilos para el contenedor
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

// Por comodidad guardamos nuestro componente en la variable App
const App = composing

// Renderizamos nuestra app
render(<App />, document.getElementById('root'));
```

> TIP: Hay un patrón que se suele usar en Recompose que es crear una const `enhacer` con todos nuestros high-order components wrappeados en un `compose` y luego al exportar el componente se hace `export default enhacer(Component)`, permitiendo exportar por cada lado el `enhacer`, el `Component` y por defecto el componente wrappeado.

## 😱 Fin?
Bueno, hasta aquí llego mi amor, pero eso no significa que el tuyo también, la docu de recompose es muy larga y hay +40 helpers! 🤯, así que imaginate todo lo que se puede hacer, se creativo, innova, mete magia y sustancia y compartí lo que hagas. Cualquier duda preguntá y nunca, nunca dejes de aprender! (We re filosófico el Goncy)

## Docs
* 📚 [Recompose API Docs](https://github.com/acdlite/recompose/blob/master/docs/API.md)
* ✏️ [Recompose Base fiddle](https://jsfiddle.net/samsch/p3vsmrvo/24/)

---
*Si encontras un error, typo, cagada, moco o calificativo negativo, avisame o haceme un PR, gracias!*

**by [@goncy](http://github.com/goncy)**