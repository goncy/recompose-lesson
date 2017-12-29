import React from "react"

const Example = ({ title, name }) => {
  const Component = require(`./${name}.js`).default
  return (
    <div>
      <h2>{title}</h2>
      <Component />
      <hr />
    </div>
  )
}

export default Example
