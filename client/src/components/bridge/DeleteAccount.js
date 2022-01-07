import React, { useEffect, useState }  from 'react'
import axios from 'axios';


function DeleteAccount() {
    
    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const id = 3
        axios.get(`http://localhost:5000/candidate/details/${id}`).then(function (response) {
            setData(response.data)
            setLoading(false)
        }).catch( function (error){
            console.log(error);
        });
    }, [])

    const submitQuerry = () => { 
        axios.delete(`http://localhost:5000/database/${bdData[0].id}`).then(function (response) {
            console.log(response.data)
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
            <h5>FOTO</h5>
            <h5 className="mb-1">{bdData[0].name}</h5>

            <h4>Email: </h4>
            <h5 className="mb-1">{bdData[0].email}</h5>

            <div className="container">
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-3'>
                        <a className="btn btn-secondary" href={"/candidate/details/" + bdData[0].id} role="button">Cancelar</a>
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
