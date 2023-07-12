import { useMutation, useQuery } from "@apollo/client";
import { useState } from "react";
import { GET_CLIENT } from "../../../Queries/clientQuery";
import { GET_PROJECT, GET_SINGLE_PROJECT } from "../../../Queries/projectQuery";
import LoadingSpinner from "../../Spinner";
import { ADD_PROJECT } from "../../../Mutation/projectMutation";
import PersonIcon from '@mui/icons-material/Person';


export default function AddProject() {
  const [name, setname] = useState("");
  const [description, setdescription] = useState("");
  const [status, setstatus] = useState("");
  const [clientId, setclientId] = useState("");

  const [addProject] = useMutation(ADD_PROJECT, {
    variables: { name, description, clientId, status },

    update(cache, { data: { addProject } }) {
      const { projects } = cache.readQuery({ query: GET_PROJECT });
      cache.writeQuery({
        query: GET_PROJECT,
        data: { projects: [...projects, addProject] },
      });
    },
  });



//   getClientd for the clients
const {loading,error,data}=useQuery(GET_CLIENT)






  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(name,description,status,clientId)
    if(name&&description&&status&&clientId){
        addProject(name,description,status,clientId);
    }else{
        alert("fill all the data")
    }
    setclientId('');
    setdescription('')
    setstatus('')
    setname('')
  }



  return (
    <>
    
    {!loading && !error&&
        (
            <div>
            <button
              type="button"
              className="btn btn-primary mt-3"
              data-bs-toggle="modal"
              data-bs-target="#AddProjectModal"
            ><PersonIcon className=" mb-1"/>
              Add Project
            </button>
            <div
              className="modal fade"
              id="AddProjectModal"
              aria-labelledby="AddProjectModalLabel"
              aria-hidden="true"
            >
              <div className="modal-dialog">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title" id="AddProjectModalLabel">
                      Add Project
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="name">Name</label>
                        <input type="text" className="form-control" id="name" value={name} onChange={(e)=>{
                          e.preventDefault()
                          setname(e.target.value)
                        }} required />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="description">description</label>
                        <input type="text" className="form-control" id="description" value={description} onChange={(e)=>{
                          e.preventDefault()
                          setdescription(e.target.value)
                        }} required/>
                      </div>
      
      
                      <div className="mb-3">
                        <label htmlFor="status">status</label>
                        <select type="text" className="form-control" id="status"
                        value={status} onChange={(e)=>{
                          e.preventDefault()
                          setstatus(e.target.value)
                        }} >
                          <option value='new'>Not Started </option>
                          <option value='progress'> In Progress</option>
                          <option value='completed'> Completed</option>
      
                        </select>
                      </div>
      
      
                      <div className="mb-3">
                        <label htmlFor="clientId" className="form-label">clientId</label>
                        <select type="text" className="form-control" id="clientId"
                        value={clientId} onChange={(e)=>{
                          e.preventDefault()
                          setclientId(e.target.value)
                        }}>
                            
                                <option value=''>Select-Client</option>

                                {data.clients.map((el)=>{
                               return  <option key={el.id} value={el.id}>{el.email}</option>
                            })
                            }
                           


                        </select>
                      </div>
      
      
                      <div className="mb-3">
                        <button type="submit" data-bs-dismiss="modal" className="btn btn-secondary">Submit </button>
                      </div>
                    </form>
                  </div>
                  
                </div>
              </div>
            </div>
          </div>
        )
    }
    </>
 
  );
}
