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
                //console.log(bdData.user_name)
                //
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
                <br></br>
            </div>

            <h4>Detalhes do perfil:</h4>
            <br></br>
            <h5>FOTO</h5>
            <br></br>
            <br></br>
            <h5 className="mb-1">Nome de usuário: {bdData.user_name}, ID: {bdData.user_id}</h5>
            <br></br>

            <label>Nome completo:</label>
            <h5>{bdData.full_name}</h5>

            <label>Cargo:</label>
            <h5>{bdData.user_title}</h5>
            
            <label>Email:</label>
            <h5>{bdData.user_email}</h5>
            
            <label>Telefone/Celular:</label>
            <h5>{bdData.phone_number}</h5>

            <div className="container">
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-3'>
                        <a className="btn btn-secondary" href={"/candidate/profile/"} role="button">Cancelar</a>
                    </div>
                    <div className='col-sm-3'>
                        <button type="button" className="btn btn-danger" onClick={submitQuerry}>Sim, deletar minha conta para sempre!</button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>

        </div>
    )}
}

export default DeleteAccount
