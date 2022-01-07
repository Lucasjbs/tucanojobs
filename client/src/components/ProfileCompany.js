import React, { useEffect, useState }  from 'react'
import axios from 'axios';

function ProfileCompany() {

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
            <h5>LOGO</h5>
            <h5 className="mb-1">{bdData[0].name}</h5>

            <h4>Email: </h4>
            <h5 className="mb-1">{bdData[0].email}</h5>

            <h5>Lista de candidatos</h5>

            <br></br>
            <br></br>
        </div>
    )}
}

export default ProfileCompany
