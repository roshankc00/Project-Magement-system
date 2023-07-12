import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const ClientRow = ({client}) => {
  return (
    <tr className="py-4 my-4">
    <td>{client.name}</td>
    <td>{client.email}</td>
    <td>{client.phone}</td>
    <td>
        <button className="buttonwala">
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