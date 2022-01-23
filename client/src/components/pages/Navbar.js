import React, { useState, useEffect }  from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';

function Navbar() {

    const [login, setLogin] = useState(false)

    useEffect(() => {
        axios.get(`http://localhost:5000/logged`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) =>{
            if(response.data.user_name){
                setLogin(true)
            }
        })
    }, [])

    const logOff = () =>(
        localStorage.clear(),
        window.location.replace('/')
    )

    if(login){
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={"/"} className="navbar-brand">
                        <img src="http://localhost:3000/logo.png" 
                        alt="Main Logo"></img>
                    </Link>
        
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={"/candidates"} className="nav-link">Ver Candidatos<span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">Perfil
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={"candidate/profile"} className="dropdown-item">Ver perfil</Link>
                                <a href="/" className="dropdown-item" onClick={logOff}>Sair</a>
                                
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
            )
    }else{
        return (
            <React.Fragment>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <Link to={"/"} className="navbar-brand">
                        <img src="http://localhost:3000/logo.png" 
                        alt="Main Logo"></img>
                    </Link>
        
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
        
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link to={"/candidates"} className="nav-link">Ver Candidatos<span className="sr-only">(current)</span></Link>
                        </li>
        
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">Login
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={"/worker/login"} className="dropdown-item">Como Programador</Link>
                                <Link to={"/company/login"} className="dropdown-item">Como Empregador</Link>
                            </div>
                        </li>
                        <li className="nav-item dropdown active">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" 
                            aria-haspopup="true" aria-expanded="false">Cadastrar-se
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                                <Link to={"/worker/register"} className="dropdown-item">Como Programador</Link>
                                <Link to={"/company/register"} className="dropdown-item">Como Empregador</Link>
                            </div>
                        </li>
                        </ul>
                    </div>
                </nav>
            </React.Fragment>
            )
    }
    
}

export default Navbar
