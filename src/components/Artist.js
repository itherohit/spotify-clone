import React from 'react'

function Artist({name,image}) {
    return (
        <div>
            <img src={image} width="100px" height="100px" className="artist__image"></img>
            <h3 className="artist__name">{name}</h3>
        </div>
    )
}

export default Artist
