import React from 'react'
import PhoneForwardedIcon from '@mui/icons-material/PhoneForwarded';
import EmailIcon from '@mui/icons-material/Email';
import PersonIcon from '@mui/icons-material/Person';
const ClientInfo = ({client}) => {
  return (
    <div>
        <h1>Client Info</h1>
        <ul className='list-group'>
            <li className='list-group-item'>
                <PersonIcon/><span className='ms-2'> {client.name}</span>
            </li>
            <li className='list-group-item'>
                <PhoneForwardedIcon/> <span className='ms-2'>{client.phone} </span>
            </li>
            <li className='list-group-item'>
                <EmailIcon/> <span className='ms-1'>{client.email}</span>
            </li>
        </ul>
    </div>
  )
}

export default ClientInfo