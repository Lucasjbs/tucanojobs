import React from 'react'

function Navbar() {
    return (
    <React.Fragment>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="/">
                <img src="http://localhost:3000/logo.png" 
                alt="Main Logo"></img>
            </a>

            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item active">
                    <a className="nav-link" href="/candidates">Ver Candidatos<span className="sr-only">(current)</span></a>
                </li>

                <li className="nav-item dropdown active">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">Login
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/worker/login">Como Programador</a>
                        <a className="dropdown-item" href="/company/login">Como Empregador</a>
                    </div>
                </li>
                <li className="nav-item dropdown active">
                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
                    aria-haspopup="true" aria-expanded="false">Cadastrar-se
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a className="dropdown-item" href="/worker/register">Como Programador</a>
                        <a className="dropdown-item" href="/company/register">Como Empregador</a>
                    </div>
                </li>
                </ul>

                {/* <span className="navbar-text">
                    Profile
                </span> */}
            </div>
        </nav>
    </React.Fragment>
    )
}

export default Navbar
