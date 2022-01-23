import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

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
    
    //const [profilePicture, setProfilePicture] = useState([])
    //const [pdfLink, setPdfLink] = useState([])
    //const [ytLink, setYtLink] = useState([])


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
            let valueI = institution
            let valueL = location
            let valueT = dataTags
            if(institution.includes("Ex: ")) valueI = ""
            if(location.includes("Ex: ")) valueL = ""
            if(dataTags.includes("Ex: ")) valueT = ""

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
            <div className="if-theme hp-header home-text">
                <h3>Tem certeza que deseja editar sua conta?</h3>
                <h3>Seus dados não salvos serão perdidos!</h3>
                <br></br>
            </div>

            <h4>Detalhes do perfil:</h4>
            <br></br>
            <h5>FOTO</h5>
            <br></br>
            <br></br>
            <h5 className="mb-1">Nome de usuário: {bdData.user_name}, ID: {bdData.user_id}</h5>
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
            <input type="email" className="form-control rounded" value={phoneNumber} aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setPhoneNumber(e.target.value)}}/>

            <label>Escreva um resumo sobre você:</label>
            <textarea type="email" className="form-control rounded" placeholder="" aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setDescription(e.target.value)}}/>

            <label>Escreva o nome da sua instituição de ensino:</label>
            <input type="email" className="form-control rounded" value={institution} aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setInstitution(e.target.value)}}/>

            <label>Digite sua localização:</label>
            <input type="email" className="form-control rounded" value={location} aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setLocation(e.target.value)}}/>

            <label>Digite quais linguagens de programação você domina:</label>
            <input type="email" className="form-control rounded" value={dataTags} aria-label="Pesquisar"
            aria-describedby="search-addon" onChange={(e) => {setDataTags(e.target.value)}}/>

            <br></br>

            <label className="danger-txt">{warningLabel}</label>
            
            <br></br>
            
            <div className="container">
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-3'>
                        <a className="btn btn-secondary" href={"/candidate/profile"} role="button">Cancelar</a>
                    </div>
                    <div className='col-sm-3'>
                        <button type="button" className="btn btn-warning" onClick={submitQuerry}>Atualizar cadastro</button>
                    </div>
                </div>
            </div>
            <br></br>
            <br></br>

        </div>
    )}
}

export default EditCandidateInfo
