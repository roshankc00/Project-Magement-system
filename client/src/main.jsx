import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import {ApolloProvider,ApolloClient,InMemoryCache} from '@apollo/client'
import {BrowserRouter} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';
const serverURL=import.meta.env.VITE_API_URL
const client=new ApolloClient({
  uri:serverURL,
  cache:new InMemoryCache(),

})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
          <App />
      </BrowserRouter>
    </ApolloProvider>
  </React.StrictMode>,
)
