import React, { useEffect, useState }  from 'react'
import axios from 'axios';
import ReactPaginate from 'react-paginate';
import { Link } from 'react-router-dom';


//HOME PAGE
function CandidatesTable() {

    const [bdData, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/").then(function (response) {
            setData(response.data)
        }).catch( function (error){
            console.log(error);
        });
    }, [])

    return (
        <div className="container">
            <div className='row'>
                <div className='col-sm-2'></div>
                <div className='col-sm-8'>
                    <div className="list-group">
                            
                        {bdData.map((value, index) =>{
                            if(index < 5){
                                return (
                                <Link to={"/candidate/details/" + value.user_id} 
                                className="list-group-item list-group-item-action flex-column align-items-start card-layout" key={value.user_id}>
                                    <div className="d-flex w-100 justify-content-between">
                                        <h5 className="mb-1">{value.full_name}</h5>
                                        <small className="text-muted">3 days ago</small>
                                    </div>
                                    <p className="mb-1">{value.description}</p>
                                    <small className="text-muted">{value.user_email}</small>
                                </Link>)
                                }
                            })}

                    </div>
                </div>
                <div className='col-sm-2'></div>
            </div>
        </div>
    )
}

//PAGINATION
export function CandidatesAll(){
    const [bdData, setData] = useState([])

    useEffect(() => {
        axios.get("http://localhost:5000/").then(function (response) {
            setData(response.data.slice(0,50))
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
        <Link to={"/candidate/details/" + value.user_id} 
        className="list-group-item list-group-item-action flex-column align-items-start card-layout" key={value.user_id}>
            <div className="d-flex w-100 justify-content-between">
                <h5 className="mb-1">{value.full_name}</h5>
                <small className="text-muted">3 days ago</small>
            </div>
            <p className="mb-1">{value.description}</p>
            <small className="text-muted">{value.user_email}</small>
        </Link>)
    })

    return (
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
    )
}

export default CandidatesTable
