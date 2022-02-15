import React, { useState }  from 'react'
import {CandidatesAll} from "./CandidatesTable"
import axios from 'axios';
import ReactPaginate from 'react-paginate';

function CandidateQuery() {

    const [description, setDescription] = useState("");
    const [searchFlag, setSearchFlag] = useState(false);

    const [bdData, setData] = useState([])

    function dateConverter(date){
        let formatDate = date.split('T')[0]
        const ddMMYY = formatDate.split('-')
        formatDate = ddMMYY[2] + "/" + ddMMYY[1] + "/" + ddMMYY[0]
        return formatDate
    }

    const submitQuerry = () => { 
        axios.get(`http://localhost:5000/database/search?dataDescripion=${description}`).then(function (response) {
            setData(response.data.slice(0,50))
            setSearchFlag(true)
        }).catch( function (error){
            console.log(error);
        });
    }



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


    if(searchFlag===false){
        return (
            <React.Fragment>
                <div className="container searchBar">
                    <div className='row'>
                        <div className='col-sm-3'></div>
                        <div className='col-sm-6'>
                            <div className="input-group">
                                <input type="search" className="form-control rounded" placeholder="Digite sua pesquisa" aria-label="Pesquisar"
                                aria-describedby="search-addon" onChange={(e) => {setDescription(e.target.value)}}/>
                                <button type="button" className="btn btn-outline-primary" 
                                onClick={submitQuerry}>Pesquisar</button>
                            </div>
                        </div>
                        <div className='col-sm-3'></div>
                    </div>
                </div>
                <CandidatesAll></CandidatesAll>
            </React.Fragment>
            )
    } else{
        return (
        <React.Fragment>
            <div className="container searchBar">
                <div className='row'>
                    <div className='col-sm-3'></div>
                    <div className='col-sm-6'>
                        <div className="input-group">
                            <input type="search" className="form-control rounded" placeholder="Digite sua pesquisa" aria-label="Pesquisar"
                            aria-describedby="search-addon" onChange={(e) => {setDescription(e.target.value)}}/>
                            <button type="button" className="btn btn-outline-primary" 
                            onClick={submitQuerry}>Pesquisar</button>
                        </div>
                    </div>
                    <div className='col-sm-3'></div>
                </div>
            </div>

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
        </React.Fragment>
        )
    }
}

export default CandidateQuery
