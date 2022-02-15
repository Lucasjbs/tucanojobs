import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


function DeleteAccount() {
    let navigate = useNavigate()

    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/profile`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) =>{
            if(response.data.user_id){
                setData(response.data)
                setLoading(false)
            }
            else{
                navigate('/')
            }
        })
    }, [])

    const submitQuerry = () => { 
        axios.delete(`http://localhost:5000/database`, {
            headers: {
                token: localStorage.getItem('token'),
                user_name: bdData.user_name
            }
        }).then(function (response) {
            if(response.data==="Success"){
                localStorage.clear()
                window.location.replace('/')
            }
        }).catch( function (error){
            console.log(error);
        });
    }


    if(loading){
        return (
            <div className='background'>
                <h2>Loading...</h2>
            </div>
            )
    }
    else{
    return (
        <div className='background'>
            <div className="if-theme hp-header home-text">
                <h3>Tem certeza que deseja deletar sua conta?</h3>
                <h3>Seus dados serão perdidos para sempre!</h3>
            </div>
            <br></br>

            <div className="container">
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8 candidateDisplay'>
                        <h3 className="mb-1">{bdData.full_name}</h3>
                        <h5 className="mb-1">{bdData.user_title}</h5>
                        <br></br>
                        <h4 className="mb-1">Resumo:</h4>
                        <h6 className="mb-1">{bdData.description}</h6>
                        <br></br>
                        <h4 className="mb-1">Competências:</h4>
                        <h5 className="mb-1">{bdData.user_tags}</h5>
                        <br></br>
                        <h4 className="mb-1">Contato:</h4>
                        <h6 className="mb-1">Endereço de email: {bdData.user_email}</h6>
                        <h6 className="mb-1">Número de telefone: {bdData.phone_number}</h6>
                        <h6 className="mb-1">Instituição de ensino: {bdData.user_institution}</h6>
                        <h6 className="mb-1">Local: {bdData.user_location}</h6>

                        <br></br>
                        <br></br>
                        <a className="btn btn-secondary" href={"/candidate/profile/"} role="button">Cancelar</a>
                        <button type="button" className="btn btn-danger btnRight" onClick={submitQuerry}>Sim, deletar minha conta para sempre!</button>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>

        </div>
    )}
}

export default DeleteAccount
