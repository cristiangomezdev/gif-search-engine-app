import React from 'react'
import logo from '../../img/book.svg'
export const NothingSelected = () => {
    return (
        <div className="nothing__main-content">
            <p>Select or<br />
           \ \  / /<br />
             create an entry</p>
             <hr />
             <img className="journal__logo" src={logo} alt="logo" />

            
        </div>
    )
}
