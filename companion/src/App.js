import React, { Component } from "react"

import Example from "./components/Example"

import "./App.css"

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">Recompose lesson companion</h1>
        </header>
        <div className="App-intro">
          <Example title="Rendering condicional" name="ConditionalRendering" />
          <Example title="Agregar lógica" name="AddLogic" />
        </div>
      </div>
    )
  }
}

export default App
