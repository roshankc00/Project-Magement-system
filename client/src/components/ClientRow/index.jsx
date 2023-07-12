import { useMutation } from '@apollo/client';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { DELETE_CLIENT } from '../../Mutation/clientMutation';
import { GET_CLIENT } from '../../Queries/clientQuery';
const ClientRow = ({client}) => {
    const [deleteClient]=useMutation(DELETE_CLIENT,{
        variables:{id:client.id},
        // refetchQueries:[{query:GET_CLIENT}],
        update(cache,{data:{deleteClient}}){
            const {clients}=cache.readQuery({query:GET_CLIENT});
            cache.writeQuery({
                query:GET_CLIENT,
                data:{clients:clients.filter(client=>client.id!==deleteClient.id)}
            })
        }
    });
  return (
    <tr className="py-4 my-4">
    <td>{client.name}</td>
    <td>{client.email}</td>
    <td>{client.phone}</td>
    <td>
        <button className="buttonwala" onClick={(e)=>{
            e.preventDefault()
            deleteClient()
            }}>
            <DeleteIcon/>
        </button>
        <button className="ms-1 shadow-none buttonwala">
            <EditIcon/>
        </button>
    </td>
  </tr>
  )
}

export default ClientRow