import { useMutation } from "@apollo/client";
import { useState } from "react";
import { GET_CLIENT } from "../../../Queries/clientQuery";
import { ADD_CLIENT } from "../../../Mutation/clientMutation";

export default function AddClient() {
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [phone, setphone] = useState("");

  const [addClient] = useMutation(ADD_CLIENT, {
    variables: { name, email, phone },
    update(cache, { data: { addClient } }) {
      const { clients } = cache.readQuery({ query: GET_CLIENT });

      cache.writeQuery({
        query: GET_CLIENT,
        data: { clients: [...clients, addClient] },
      });
    },
  });


  const handleSubmit=(e)=>{
    e.preventDefault();

    console.log(email,name,phone);
    if(name&&email&&phone){
      addClient(name,email,phone)
    }

    setemail('')
    setphone('')
    setname('')

  }
  return (
    <div>
      <button
        type="button"
        className="btn btn-primary mt-3"
        data-bs-toggle="modal"
        data-bs-target="#AddClientModal"
      >
        Add Client
      </button>
      <div
        className="modal fade"
        id="AddClientModal"
        tabindex="-1"
        aria-labelledby="AddClientModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="AddClientModalLabel">
                Add Client
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
                  <label htmlFor="email">Email</label>
                  <input type="email" className="form-control" id="email" value={email} onChange={(e)=>{
                    e.preventDefault()
                    setemail(e.target.value)
                  }} required/>
                </div>
                <div className="mb-3">
                  <label htmlFor="phone">Phone</label>
                  <input type="text" className="form-control" id="phone"
                  value={phone} onChange={(e)=>{
                    e.preventDefault()
                    setphone(e.target.value)
                  }}  required/>
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
  );
}
