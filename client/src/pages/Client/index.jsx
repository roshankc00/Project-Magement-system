import Table from 'react-bootstrap/Table';;
import { Button } from "bootstrap";
import { gql,useQuery } from "@apollo/client"
import { GET_CLIENT } from '../../Queries/clientQuery';
import LoadingSpinner from '../../components/Spinner';
import ClientRow from '../../components/ClientRow';
import AddClient from '../../components/modals/AddClient';

const Client = () => {

   const {loading,error,data}= useQuery(GET_CLIENT)
   if(loading){
    return <LoadingSpinner/>
   }
   if(error){
    <P> Something went wrong</P>
   }
  return (
    <div className="container">
      <div className="d-flex justify-content-between align-align-items-center">

        <h1 className="fs-3 text-center my-4" >User-Details</h1>
        <AddClient/>
      </div>
        

        {
            !loading && !error &&

            <Table striped>
            <thead>
              <tr>
                <th>SN</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
                {
                    data.clients.map((el,elIndex)=>{
                        
                return (
                  <ClientRow key={el.id} client={el}/>
                       
        )})
            }
            </tbody>
          </Table>
        }
    </div>
  )
}

export default Client 