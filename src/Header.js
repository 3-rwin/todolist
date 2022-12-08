import React from 'react'

// props contains all the properties passed in from the app.js, like title
const Header = (props) => {

  return (
    <header>
        <h1>{props.title}</h1>    
    </header>
  )
}

// The Header expects a prop, but if it does not receive it it will use default props from the system, or defined here.
Header.defaultProps = {
  title: "Default Title"
}

export default Header