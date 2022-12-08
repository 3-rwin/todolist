import React from 'react'

const Footer = ( props ) => {
    const today = new Date();
    return (
        <footer>
            <p>{props.length} item{props.length === 1 ? "" : "s"} in de lijst</p>
        </footer>
    )
}

export default Footer