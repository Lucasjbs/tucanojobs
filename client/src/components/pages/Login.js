import React, { useState, useEffect }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {
    let navigate = useNavigate()
    
    const [userNameLogin, setUserNameLogin] = useState("")
    const [passwordLogin, setPasswordLogin] = useState("")
    const [warningLabel, setWarningLabel] = useState("")

    axios.defaults.withCredentials = true;

    const loginUser = () =>{
        axios.post(`http://localhost:5000/login`, {
            userName: userNameLogin,
            password: passwordLogin
        }).then(function (response) {
            if(response.data.token)
            {
                localStorage.setItem('token', response.data.token)
                window.location.replace('/candidate/profile')
            }
            else if(response.data==="User do not exist!" || response.data==="Wrong password!")
                setWarningLabel("Nome de usuário ou senha estão errados!")
            else if(response.data==="Name too small") 
                setWarningLabel("O nome não pode ter menos que 2 caracteres!")
            else if(response.data==="Password too small") 
                setWarningLabel("A senha não pode ter menos que 8 caracteres!")
            else setWarningLabel("Houve um erro!")
            
        }).catch( function (error){
            console.log(error);
        });
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/logged`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) =>{
            if(response.data.user_name){
                navigate('/candidate/profile')
            }
        })
    }, [])

    return (
        <div>

            <div className="if-theme hp-header home-text">
                <h3>Aqui você encontra programadores e desenvolvedores recém graduados na área de <i>Tecnologia da Informação</i>.</h3>
                <br></br>
                <i>Veja a lista de candidatos do site, e encontre o desenvolvedor na linguagem que você precisa.</i>
                <br></br>
                <i>Encontre desenvolvedores de Front-End, Back-End, Mobile ou Full Stack que sua empresa precisa.</i>
            </div>

            <br></br>
            <br></br>
            <div className="container">
                <div className='row'>
                    <div className='col-sm-3'></div>

                    <div className='col-sm-6'>
                        <input type="text" className="form-control rounded" placeholder="Nome de usuário" aria-label="Pesquisar"
                        aria-describedby="search-addon" onChange={(e) => {setUserNameLogin(e.target.value)}}/>
                        <br></br>
                        <input type="password" className="form-control rounded" placeholder="Senha" aria-label="Pesquisar"
                        aria-describedby="search-addon" onChange={(e) => {setPasswordLogin(e.target.value)}}/>
                        <br></br>
                        <button type="button" className="btn btn-success" onClick={loginUser}>Login</button>
                        <br></br>
                        <br></br>
                        <label className="danger-txt">{warningLabel}</label>
                    </div>
                    <div className='col-sm-3'></div>
                </div>
            </div>
        </div>
    )
}

export default Login
