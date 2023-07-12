import { gql} from "@apollo/client"
export const GET_CLIENT=gql`
query getClients {
    clients{
        id,
        name,
        email,
        phone
    }



}
  `