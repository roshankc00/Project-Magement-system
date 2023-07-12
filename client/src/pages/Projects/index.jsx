import React from 'react'
import LoadingSpinner from '../../components/Spinner'
import { useQuery } from '@apollo/client'
import { GET_PROJECT } from '../../Queries/projectQuery'
import ProjectCard from '../../components/Cards/ProjectCard'
import AddProject from '../../components/modals/AddProject'

function Project() {
    const {loading,error,data}=useQuery(GET_PROJECT)
    if(loading){
        return(
            <LoadingSpinner/>
        )
    }
    if(error){
        return (
            <h1> Something went Wrong</h1>
        )
    }


  return (
    <div className='mt-4 container'>
        <div className="d-flex justify-content-between align-items-center my-4" > 
        <h1>Project</h1>
        <AddProject/>
        
         </div>

{
    data.projects.length>0? 
    <>
 
    <div className="row">
        {
            data.projects.map((el)=>{
               return  (
                <ProjectCard key={el.id} project={el}/>
               )
            })
        }
    </div>

    </>
    
    :
    <>
       <h1> No Projects Available</h1>

    </>
}

    </div>
  )
}

export default Project   