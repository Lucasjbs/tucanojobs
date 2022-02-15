import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactPlayer from 'react-player'

function CandidateDetails() {
    const id = useParams().id

    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [fileWarning, setFileWarning] = useState("")

    const downloadPDF = () => {

        axios({
            url:`http://localhost:5000/download/${"cv_" + bdData.user_name + ".pdf"}`,
            method: 'GET',
            responseType: 'blob'
        })
        .then( function (response) {
            if(response.data.size < 20){
                setFileWarning("O candidato não cadastrou um arquivo PDF!")
            }
            else{
            const url = window.URL.createObjectURL(
            new Blob([response.data]),
            );
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute(
              'download',
              `Tucano_Profile.pdf`,
            );
        
            // Append to html link element page
            document.body.appendChild(link);
        
            // Start download
            link.click();
        
            // Clean up and remove the link
            link.parentNode.removeChild(link);
            }
        });
    }

    function dateConverter(date){
        let formatDate = date.split('T')[0]
        const ddMMYY = formatDate.split('-')
        formatDate = ddMMYY[2] + "/" + ddMMYY[1] + "/" + ddMMYY[0]
        return formatDate
    }

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
            <br></br>
            <div className="container">
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-8 candidateDisplay'>
                        <h3 className="mb-1">{bdData.full_name}</h3>
                        <h5 className="mb-1">{bdData.user_title}</h5>
                        <br></br>
                        <h6 className="mb-1"> Última atualização: {dateConverter(bdData.resume_date)}</h6>
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
                        <h4 className="mb-1">Currículo:</h4>
                        <button onClick={downloadPDF}>
                            <img src="http://localhost:3000/PdfLogo.png" 
                            alt="Download PDF"></img>
                        </button>
                        <br></br>
                        <label className="danger-txt">{fileWarning}</label>

                        <br></br>
                        <br></br>
                        <h4 className="mb-1">Vídeo de apresentação:</h4>
                        <div className="player-wrapper">
                            <ReactPlayer
                            url={bdData.youtube_link}
                            className='react-player'
                            width="100%"
                            height="100%"
                            controls={true}
                            />
                        </div>
                        <br></br>
                    </div>
                </div>
            </div>
            <br></br>
        </div>
    )}
}

export default CandidateDetails
