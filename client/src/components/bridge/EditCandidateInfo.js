import React, { useEffect, useState }  from 'react'
import axios from 'axios';

function EditCandidateInfo() {

    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)

    const [dataName, setDataName] = useState([])
    const [dataEmail, setDataEmail] = useState([])
    const [dataAge, setDataAge] = useState([])

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
        axios.put(`http://localhost:5000/database/${bdData[0].id}`, {
            name: dataName,
            age: dataAge,
            email: dataEmail
        }).then(function (response) {
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
                <h3>Tem certeza que deseja editar sua conta?</h3>
                <h3>Seus dados não salvos serão perdidos!</h3>
                <br></br>
            </div>

            <h4>Detalhes do perfil:</h4>
            <h5>FOTO</h5>
            <h5 className="mb-1">{bdData[0].name}</h5>
            <h5 className="mb-1">{bdData[0].email}</h5>

            <input type="search" className="form-control rounded" placeholder="Digite seu nome" aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setDataName(e.target.value)}}/>

            <input type="search" className="form-control rounded" placeholder="Digite seu email" aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setDataEmail(e.target.value)}}/>

            <input type="search" className="form-control rounded" placeholder="Digite sua idade" aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setDataAge(e.target.value)}}/>

            <br></br>
            
            <div className="container">
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-3'>
                        <a className="btn btn-secondary" href={"/candidate/details/" + bdData[0].id} role="button">Cancelar</a>
                    </div>
                    <div className='col-sm-3'>
                        <button type="button" className="btn btn-warning" onClick={submitQuerry}>Editar dados!</button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>

        </div>
    )}
}

export default EditCandidateInfo
