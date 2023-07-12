import { useMutation, useQuery } from '@apollo/client'
import React, { useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { GET_PROJECT, GET_SINGLE_PROJECT } from '../../Queries/projectQuery'
import Spinner from 'react-bootstrap/esm/Spinner'
import ClientInfo from '../../components/ClientInfo'
import DeleteIcon from '@mui/icons-material/Delete';

import { DELETE_PROJECT } from '../../Mutation/projectMutation'
import EditProject from '../../components/modals/EditProject'

const ProjectDetail = () => {
    const navigate=useNavigate()
    const {id}=useParams();

        const [deleteProject] = useMutation(DELETE_PROJECT, {
        variables: { id: id },
        refetchQueries: [{ query: GET_PROJECT }],
        onCompleted: () => navigate('/'),
      });
    const {loading,error,data}=useQuery(GET_SINGLE_PROJECT,{
        variables:{id:id}
    })
    if(loading){
        return(
            <Spinner/>
        )
    }
    if(error){
        console.log(error)

        return(
            <h1>Something Went Wrong</h1>
        )
    }


      

 

  return (
    <>
    {
        !loading&&!error&&(
            <div className="mx-auto w-75 card p-5">
                <Link to='/' className='btn btn-light btn-sm ms-auto d-inline'> Back</Link>
                <h1>{data.project.name}</h1>
                <p className='fw-bold'>{data.project.description}</p>
                <h5>Status: {data.project.status}</h5>  
                <ClientInfo key={data.project.id} client={data.project.client}/> 

                <div className="d-flex justify-content-center gap-4">

                <button className="buttonwala mx-4" onClick={(e)=>{
                    e.preventDefault()
                    console.log("wow")
                    deleteProject(id)
                }}>
            <DeleteIcon/>
        </button>
        <EditProject id={id}/>
        
        
                </div>

            </div>
        )
    }
  
    
    
    </>
  )
}

export default ProjectDetail 