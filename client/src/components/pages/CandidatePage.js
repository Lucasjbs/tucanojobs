import React from 'react'
import CandidateQuery from "../bridge/CandidateQuery"

function CandidatePage() {

    
    return (
    <React.Fragment>
        <div className='background'>
            <div className="if-theme hp-header home-text">
                <h3>Lista de  programadores e desenvolvedores recém graduados na área de <i>Tecnologia da Informação</i>!</h3>
                <br></br>
                <i>Encontre o desenvolvedor na linguagem de programação que você precisa através da lista de candidatos do site.</i>
            </div>
            
            <CandidateQuery></CandidateQuery>

            <div className='home-bottom'>
                <h3> Este site foi construído através de um projeto do Instituto Federal de Educação, Ciência e 
                    Tecnologia do Sul de Minas - CAMPUS POÇOS DE CALDAS
                </h3>
                <img src="http://localhost:3000/logoif.png" alt="IF Logo"></img>
            </div>
            
        </div>
    </React.Fragment>
    )
}

export default CandidatePage
