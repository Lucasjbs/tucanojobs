import React from 'react'

function CompanyFavList(props) {
    
    const id = 4
    const submitQuerry = () => {
        console.log("Adicionar candidato com id = " + props.id + " aos favoritos da compania ???")
    }
    

    return (
    <div className="home-generic-text">
        <button type="button" className="btn btn-info" 
        onClick={submitQuerry}>Adicionar à lista</button>
    </div>
    )
}

export default CompanyFavList
