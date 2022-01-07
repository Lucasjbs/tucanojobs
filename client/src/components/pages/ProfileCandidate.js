import React, { useEffect, useState }  from 'react'
import axios from 'axios';

function ProfileCandidate() {

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
                <h3>Bem vindo <i>{bdData[0].name}</i>!</h3>
                <br></br>
            </div>

            <h4>Detalhes do perfil:</h4>
            <h5>FOTO</h5>
            <h5 className="mb-1">{bdData[0].name}</h5>

            <h4>Email: </h4>
            <h5 className="mb-1">{bdData[0].email}</h5>

            <div className="container">
                <div className='row'>
                    <div className='col-sm-4'></div>
                    <div className='col-sm-4'>
                        <a className="btn btn-warning" href={"/candidate/edit/"+ bdData[0].id} role="button">Editar dados</a>
                    </div>
                    <div className='col-sm-4'>
                        <a className="btn btn-danger" href={"/candidate/delete/"+ bdData[0].id} role="button">Deletar currículo</a>
                    </div>
                </div>
            </div>

            <br></br>
            <br></br>
        </div>
    )}
}

export default ProfileCandidate
