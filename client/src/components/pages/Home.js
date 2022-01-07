import React from 'react'
import CandidatesTable from "../bridge/CandidatesTable"

function Home() {

    return (
        <React.Fragment>
            <div className='background'>
                <div className="if-theme hp-header home-text">
                    <h3>Aqui você encontra programadores e desenvolvedores recém graduados na área de <i>Tecnologia da Informação</i>.</h3>
                    <br></br>
                    <a className="btn btn-info" href="/candidates" role="button">Ver Candidatos</a>
                    <br></br>
                    <br></br>
                    <i>Veja a lista de candidatos do site, e encontre o desenvolvedor na linguagem que você precisa.</i>
                    <br></br>
                    <i>Encontre desenvolvedores de Front-End, Back-End, Mobile ou Full Stack que sua empresa precisa.</i>
                </div>

                <div className="home-generic-text">
                    <h4>Procure os programadores na linguagem de programação desejada, ou cadastre já o seu currículo 
                        para se candidatar as vagas!</h4>
                    <h3>Lista dos últimos candidatos: </h3>
                </div>

                <CandidatesTable></CandidatesTable>

                <div className="container">
                    <div className='row'>
                        <div className='col-sm-4'>
                            <h5>Dúvidas sobre o site? Acesse <a href='/questions'>perguntas frequentes</a> ou mande um 
                            email para nós através do <a href='/talktous'>fale conosco</a>!</h5>
                        </div>
                        <div className='col-sm-4'>
                            <h5>Busque pelos programadores na área que você precisa através do filtro da lista de candidatos</h5>
                        </div>
                        <div className='col-sm-4'>
                            <h5>Plataforma 100% dedicada à programadores e desenvolvedores!</h5>
                        </div>
                    </div>
                </div>

                <div className='home-bottom'>
                    <h3> Este site foi construído através de um projeto do Instituto Federal de Educação, Ciência e 
                        Tecnologia do Sul de Minas - CAMPUS POÇOS DE CALDAS</h3>
                        <img src="http://localhost:3000/logoif.png" 
                alt="IF Logo"></img>
                </div>
                
            </div>
        </React.Fragment>
    )
}

export default Home
