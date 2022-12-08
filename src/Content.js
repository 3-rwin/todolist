import React from 'react';
import ItemList from './ItemList'
import { FaBeer } from 'react-icons/fa'

// the drilled down items need to be defined as parameters
const Content = ({ items, handleCheck, handleDelete}) => {
    return (
        // When creating a fragment (the <main></main> is in app.js) you need to use <></> to show react this is HTML
        <>
            {/* drill down the props coming from App.js to the next level */}
            {items.length ? (
                <ItemList 
                    items={items}
                    handleCheck={handleCheck}
                    handleDelete={handleDelete}
                />
            ): 
                <p style={{ marginTop: '2rem'}}> Tijd voor <FaBeer /> !</p>
            }
        </>
    )
}

export default Content