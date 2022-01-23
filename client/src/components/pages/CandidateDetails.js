import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import CompanyFavList from '../bridge/CompanyFavList';
import { useParams } from 'react-router-dom';

function CandidateDetails() {
    const id = useParams().id

    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:5000/candidate/details/${id}`).then(function (response) {
            setData(response.data[0])
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
                <h3>Lista de  programadores e desenvolvedores recém graduados na área de <i>Tecnologia da Informação</i>!</h3>
                <br></br>
                <i>Veja a lista de candidatos do site, e encontre o desenvolvedor na linguagem que você precisa.</i>
                <br></br>
                <i>Encontre desenvolvedores de Front-End, Back-End, Mobile ou Full Stack que sua empresa precisa.</i>
            </div>

            <div className="home-generic-text">
                <h4>Detalhes do candidato:</h4>
                <h4>Nome: </h4>
                <h5 className="mb-1">{bdData.full_name}</h5>

                <h4>Email: </h4>
                <h5 className="mb-1">{bdData.user_email}</h5>

                <CompanyFavList id={bdData.user_id}></CompanyFavList>
            </div>
            

            <div className='home-bottom'>
                <h3> Este site foi construído através de um projeto do Instituto Federal de Educação, Ciência e 
                    Tecnologia do Sul de Minas - CAMPUS POÇOS DE CALDAS</h3>
                    <img src="http://localhost:3000/logoif.png" 
            alt="IF Logo"></img>
            </div>
        </div>
    )}
}

export default CandidateDetails
