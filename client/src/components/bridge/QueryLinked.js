import React, { useState, useEffect }  from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function QueryLinked() {
    const tag = useParams().tag
    
    const [bdData, setData] = useState([])
    const [loading, setLoading] = useState(true)

    function dateConverter(date){
        let formatDate = date.split('T')[0]
        const ddMMYY = formatDate.split('-')
        formatDate = ddMMYY[2] + "/" + ddMMYY[1] + "/" + ddMMYY[0]
        return formatDate
    }

    useEffect(() => {
        axios.get(`http://localhost:5000/database/search?dataDescripion=${tag}`).then(function (response) {
            setData(response.data.slice(0,50))
            setLoading(false)
        }).catch( function (error){
            console.log(error);
        });
    }, [])

    const [pageNumber, setPageNumber] = useState(0)

    const usersPerPage = 6
    const pagesVisited = pageNumber * usersPerPage

    const handlePageClick = ({selected}) => {
        setPageNumber(selected)
    }
    const pageCount = Math.ceil(bdData.length / usersPerPage)

    const displayUsers = bdData.slice(pagesVisited, pagesVisited + usersPerPage).map((value) =>{
        return (
        <a href={"/candidate/details/" + value.user_id} 
        className="list-group-item list-group-item-action flex-column align-items-start card-layout" key={value.user_id}>
        <div className="d-flex w-100 justify-content-between">
            <h5 className="mb-1">{value.full_name}</h5>
            <small className="text-muted">{dateConverter(value.resume_date)}</small>
        </div>
        <p className="mb-1">{value.user_title}</p>
        <small className="text-muted">{value.user_tags}</small>
        </a>)
    })
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
                    <i>Encontre o desenvolvedor na linguagem de programação que você precisa através da lista de candidatos do site.</i>
                </div>
                
                <br></br>
                <div className="container">
                    <div className='row'>
                        <div className='col-sm-2'></div>
                        <div className='col-sm-8'>
                            <div className="list-group">
                                {displayUsers}
                                <ReactPaginate
                                    nextLabel="next >"
                                    onPageChange={handlePageClick}
                                    pageCount={pageCount}
                                    previousLabel="< previous"
                                    containerClassName='paginationBttns'
                                    nextLinkClassName='nextBttn'
                                    activeClassName='paginationActive'
                                />
                            </div>
                        </div>
                        <div className='col-sm-2'></div>
                    </div>
                </div>
            </div>
            )
    }
}

export default QueryLinked;
