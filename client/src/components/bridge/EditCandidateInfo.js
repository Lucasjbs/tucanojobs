import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ReactPlayer from 'react-player'

function EditCandidateInfo() {
    let navigate = useNavigate()

    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)
    const [warningLabel, setWarningLabel] = useState("")

    const [dataName, setDataName] = useState([])
    const [dataTitle, setDataTitle] = useState([])
    const [dataEmail, setDataEmail] = useState([])
    const [phoneNumber, setPhoneNumber] = useState([])
    const [description, setDescription] = useState([])
    const [institution, setInstitution] = useState([])
    const [location, setLocation] = useState([])
    const [dataTags, setDataTags] = useState([])

    const [fileWarning, setFileWarning] = useState("")
    const [file, setFile] = useState([])
    const [videoWarning, setVideoWarning] = useState("")
    const [videoUrl, setVideoUrl] = useState("")

    const checkValidation = (validation) => {
        if(validation) return "válido!"
        else return "inválido!"
    }

    const onDurationHandler = state => {
        if(state <= 180) setVideoWarning("A duração do vídeo é VALIDA!")
        else setVideoWarning("A duração do vídeo é INVALIDA!")
    }
  
    const onInputChange = (e) => {
        setFile(e.target.files)

        const fileTemp = e.target.files

        if(fileTemp[0].size > 300 * 1024) 
            setFileWarning("O tamanho máximo é 300KB!")
        else if(fileTemp[0].type !== "application/pdf")
            setFileWarning("O arquivo deve estar no formato pdf!")
        else
            setFileWarning("")
    };

    useEffect(() => {
        axios.get(`http://localhost:5000/profile`, {
            headers: {
                token: localStorage.getItem('token')
            }
        }).then((response) =>{
            if(response.data.user_id){

                setData(response.data)

                setDataName(response.data.full_name || "Ex: João Silva")
                setDataTitle(response.data.user_title || "Ex: Engenheiro da Computação")
                setDataEmail(response.data.user_email || "Ex: joão.silva@gmail.com")
                setPhoneNumber(response.data.phone_number || "Ex: (36) 99936-5578")
                setInstitution(response.data.user_institution || "Ex: Instituto Federal do Sul de Minas")
                setLocation(response.data.user_location || "Ex: Poços de Caldas, Minas Gerais")
                setDataTags(response.data.user_tags || "Ex: Javascript, PHP, Java")
                setVideoUrl(response.data.youtube_link || "Ex: https://www.youtube.com/watch?v=p2vpqKBPj4U")
                
                setLoading(false)
            }
            else{
                navigate('/')
            }
        })
    }, [])

    const submitQuerry = () => {
        
        if(dataName.length<4 || dataName.includes("Ex: ")) 
            setWarningLabel("O nome completo é um campo obrigatório!")
        else if(dataTitle.length<4 || dataTitle.includes("Ex: "))
            setWarningLabel("O cargo é um campo obrigatório!")
        else if(dataEmail.length<4 || dataEmail.includes("Ex: "))
            setWarningLabel("O email é um campo obrigatório!")
        else if(!dataEmail.includes("@"))
            setWarningLabel("O email digitado é inválido!")
        else if(phoneNumber.length<4 || phoneNumber.includes("Ex: "))
            setWarningLabel("O número de telefone é um campo obrigatório!")
        else{
            if(file.length>0 && file[0].size < 300 * 1024 && file[0].type === "application/pdf"){
                const data = new FormData();
                for(let i = 0; i < file.length; i++) {
                    data.append('file', file[i]);
                }

                axios.post(`http://localhost:5000/upload/${bdData.user_name}`, data)
            }
            let valueI = institution
            let valueL = location
            let valueT = dataTags
            let valueY = videoUrl
            if(institution.includes("Ex: ")) valueI = ""
            if(location.includes("Ex: ")) valueL = ""
            if(dataTags.includes("Ex: ")) valueT = ""
            if(videoUrl.includes("Ex: ") || videoWarning.includes("A duração do vídeo é INVALIDA!")) valueY = ""

            let dateValue = new Date()
            dateValue = dateValue.toISOString().split('T')[0]

            setWarningLabel("")

            axios.put(`http://localhost:5000/database/${bdData.user_name}`, {
                full_name: dataName,
                user_title: dataTitle,
                user_email: dataEmail,
                phone_number: phoneNumber,
                description: description,
                resume_date: dateValue,
                user_institution: valueI,
                user_location: valueL,
                user_tags: valueT,
                youtube_link: valueY,
                token: localStorage.getItem('token')
            }).then(function (response) {
                if(response.data==="Success")
                    window.location.replace('/candidate/profile')
            }).catch( function (error){
                console.log(error);
            });
        }
    }

    if(loading){
        return (
            <div className='background'>
                <h2>Carregando...</h2>
            </div>
            )
    }
    else{
    return (
        <div className='background'>
            <div className="container">
                <div className='row'>
                    <div className='col-sm-2'></div>
                    <div className='col-sm-10 candidateDisplay'>
                    <br></br>
                    <h4>Detalhes do perfil:</h4>
                    <br></br>
                    <h5 className="mb-1">Nome de usuário: {bdData.user_name}, ID: {bdData.user_id}</h5>
                    <h5>O seu currículo é {checkValidation(bdData.resume_validation)}</h5>
                    <br></br>
                    
                    <label>Digite seu nome completo:</label>
                    <input type="text" className="form-control rounded" value={dataName} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setDataName(e.target.value)}}/>
                    
                    <label>Digite seu cargo:</label>
                    <input type="text" className="form-control rounded" value={dataTitle} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setDataTitle(e.target.value)}}/>

                    <label>Digite seu email:</label>
                    <input type="email" className="form-control rounded" value={dataEmail} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setDataEmail(e.target.value)}}/>

                    <label>Digite seu telefone/celular:</label>
                    <input type="text" className="form-control rounded" value={phoneNumber} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setPhoneNumber(e.target.value)}}/>

                    <label>Escreva um resumo sobre você:</label>
                    <textarea type="text" className="form-control rounded" placeholder="" aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setDescription(e.target.value)}}/>

                    <label>Escreva o nome da sua instituição de ensino:</label>
                    <input type="text" className="form-control rounded" value={institution} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setInstitution(e.target.value)}}/>

                    <label>Digite sua localização:</label>
                    <input type="text" className="form-control rounded" value={location} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setLocation(e.target.value)}}/>

                    <label>Digite quais linguagens de programação você domina:</label>
                    <input type="text" className="form-control rounded" value={dataTags} aria-label="Pesquisar"
                    aria-describedby="search-addon" onChange={(e) => {setDataTags(e.target.value)}}/>

                    <br></br>

                    <div className="form-group">
                    <label>Envie seu currículo no formato PDF e com no máximo 300KB:</label>
                    <input type="file"
                            onChange={onInputChange}
                            className="form-control"
                            multiple/>
                    </div>

                    <label className="danger-txt">{fileWarning}</label>

                    <br></br>

                    <ReactPlayer
                        url={videoUrl}
                        className='video-hidden'
                        onDuration={onDurationHandler}
                    />
                    
                    <label>Envie o link do seu vídeo do YouTube com no máximo 3 minutos:</label>

                    <input type="text" className="form-control rounded" value={videoUrl}
                    onChange={(e) => {setVideoUrl(e.target.value)}}/>

                    <label className="danger-txt">{videoWarning}</label>
                    
                    <br></br>

                    <label className="danger-txt">{warningLabel}</label>
            
                    <br></br>
                    <br></br>

                    <a className="btn btn-secondary" href={"/candidate/profile"} role="button">Cancelar</a>
                    <button type="button" className="btn btn-warning btnRight" onClick={submitQuerry}>Atualizar cadastro</button>

                    <br></br>
                    <br></br>
                    </div>
                </div>
            </div>
        </div>
    )}
}

export default EditCandidateInfo
